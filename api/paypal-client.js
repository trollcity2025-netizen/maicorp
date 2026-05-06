export const config = {
  runtime: 'edge'
};

const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;

export default async function handler(req) {
  if (req.method !== 'GET') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!CLIENT_ID) {
    return new Response(JSON.stringify({ error: 'PayPal client ID not configured' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }

  return new Response(JSON.stringify({ clientId: CLIENT_ID }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  });
}
