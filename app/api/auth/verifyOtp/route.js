import { connectToDatabase } from '@/lib/dbConnect';
import Otp from '@/models/Otp';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

const generateToken = (userEmail) => {
  const token = jwt.sign(
    { email: userEmail },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
  return token;
};

// Handle POST request for OTP verification
export async function POST(req) {
  console.log('Received request for OTP verification:', req.method);

  const { email, otp } = await req.json();  // Updated for the app structure
  console.log('Received email:', email);
  console.log('Received OTP:', otp);

  if (!email || !otp) {
    console.log('Email or OTP missing');
    return new Response(
      JSON.stringify({ message: 'Email and OTP are required' }),
      { status: 400, headers: { 'Content-Type': 'application/json' } }
    );
  }

  try {
    await connectToDatabase();
    console.log('Connected to database');

    // Find OTP record
    const otpRecord = await Otp.findOne({ email, otp });
    console.log('OTP Record found:', otpRecord);

    if (!otpRecord) {
      console.log('Invalid or expired OTP for:', email);
      return new Response(
        JSON.stringify({ message: 'Invalid or expired OTP' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Check if OTP is expired
    const isOtpExpired = otpRecord.expiresAt && otpRecord.expiresAt < new Date();
    if (isOtpExpired) {
      console.log('OTP expired for:', email);
      await Otp.deleteOne({ email });
      return new Response(
        JSON.stringify({ message: 'OTP expired, please request a new one' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // OTP verified, delete OTP from DB
    await Otp.deleteOne({ email });
    console.log('OTP deleted from database for:', email);

    // Generate JWT token
    const token = generateToken(email);

    // Set the JWT token as an HTTP-only cookie
    return new Response(
      JSON.stringify({ message: 'OTP verified successfully', redirectTo: '/home' }),
      {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
          'Set-Cookie': cookie.serialize('authToken', token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production' ? true : false, // For local testing
            maxAge: 3600,
            path: '/',
            sameSite: 'strict'
          }),
        },
      }
    );
  } catch (error) {
    console.error('Error verifying OTP:', error);
    return new Response(
      JSON.stringify({ message: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
