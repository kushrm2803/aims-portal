import cookie from 'cookie';

export default function handler(req, res) {
    res.setHeader('Set-Cookie', cookie.serialize('authToken', null, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        expires: new Date(0),
        path: '/',
    }));

    res.status(200).json({ message: 'Logged out' });
}
