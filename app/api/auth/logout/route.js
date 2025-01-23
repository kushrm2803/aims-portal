import cookie from 'cookie';

export async function POST(req) {
  return new Response(
    JSON.stringify({ message: 'Logged out' }),
    {
      status: 200,
      headers: {
        'Set-Cookie': cookie.serialize('authToken', '', {
          httpOnly: true,
          expires: new Date(0),
          path: '/',
          sameSite: 'Strict',
        }),
        'Content-Type': 'application/json',
      },
    }
  );
}
