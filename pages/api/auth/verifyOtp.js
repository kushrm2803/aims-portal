import { connectToDatabase } from '../../../lib/dbConnect';
import Otp from '../../../models/Otp';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';
import { redirect } from 'next/dist/server/api-utils';

const generateToken = (userEmail) => {
    const token = jwt.sign(
        { email: userEmail },  // Payload
        process.env.JWT_SECRET,  // Secret key (keep it secure)
        { expiresIn: '1h' }  // Expiry time
    );

    // console.log('Generated JWT Token:', token);  
    return token;
};

export default async function handler(req, res) {
  console.log('Received request for OTP verification:', req.method);

  if (req.method !== 'POST') {
    console.log('Invalid request method:', req.method);
    return res.status(405).json({ message: 'Method Not Allowed' });
  }

  const { email, otp } = req.body;
  console.log('Received email:', email);
  console.log('Received OTP:', otp);

  if (!email || !otp) {
    console.log('Email or OTP missing');
    return res.status(400).json({ message: 'Email and OTP are required' });
  }

  try {
    await connectToDatabase();
    console.log('Connected to database');

    // Find OTP record
    const otpRecord = await Otp.findOne({ email, otp });
    console.log('OTP Record found:', otpRecord);

    if (!otpRecord) {
      console.log('Invalid or expired OTP for:', email);
      return res.status(400).json({ message: 'Invalid or expired OTP' });
    }

    // Check if OTP is expired
    const isOtpExpired = otpRecord.expiresAt && otpRecord.expiresAt < new Date();
    if (isOtpExpired) {
      console.log('OTP expired for:', email);
      await Otp.deleteOne({ email });
      return res.status(400).json({ message: 'OTP expired, please request a new one' });
    }

    // OTP verified, delete OTP from DB
    await Otp.deleteOne({ email });
    console.log('OTP deleted from database for:', email);

    // Generate JWT token
    const token = generateToken(email);

    // Set the JWT token as an HTTP-only cookie
    res.setHeader('Set-Cookie', cookie.serialize('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false, // Set to false for local testing
      maxAge: 3600,
      path: '/',
      sameSite: 'strict'
    }));

    console.log('Cookie set in response:', cookie.serialize('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production' ? true : false,
      maxAge: 3600,
      path: '/',
      sameSite: 'strict'
    }));

    res.status(200).json({ message: 'OTP verified successfully' , redirectTo:'/home' });

  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
