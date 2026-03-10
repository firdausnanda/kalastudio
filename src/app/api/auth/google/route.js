export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const from = searchParams.get('from') || 'login'; // 'login' atau 'register'

  const clientId = process.env.GOOGLE_CLIENT_ID;
  const appUrl = process.env.APP_URL || 'http://localhost:3000';
  const redirectUri = `${appUrl}/api/auth/google/callback`;

  if (!clientId) {
    return new Response('GOOGLE_CLIENT_ID tidak dikonfigurasi', { status: 500 });
  }

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    access_type: 'offline',
    prompt: 'select_account',
    state: from, // simpan asal (login/register) di state agar bisa dipakai di callback
  });

  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;

  return Response.redirect(googleAuthUrl);
}
