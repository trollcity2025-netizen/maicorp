export const config = {
  runtime: 'edge'
};

const PAYPAL_BASE = 'https://api-m.paypal.com';
const CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const CLIENT_SECRET = process.env.PAYPAL_SECRET;

async function getAccessToken() {
  if (!CLIENT_ID || !CLIENT_SECRET) {
    return null;
  }

  const response = await fetch(`${PAYPAL_BASE}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${btoa(`${CLIENT_ID}:${CLIENT_SECRET}`)}`,
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: new URLSearchParams({ grant_type: 'client_credentials' }).toString()
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PayPal token request failed: ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

async function createPayPalOrder(checkoutData) {
  const amountValue = String(checkoutData.setup || '0').replace(/[$,]/g, '');
  const numericAmount = Number(amountValue) || 0.01;

  const body = {
    intent: 'CAPTURE',
    purchase_units: [
      {
        amount: {
          currency_code: 'USD',
          value: numericAmount.toFixed(2)
        },
        description: `${checkoutData.package} - Setup Fee`,
        custom_id: JSON.stringify({
          package: checkoutData.package,
          businessName: checkoutData.businessName
        })
      }
    ]
  };

  const accessToken = await getAccessToken();
  const response = await fetch(`${PAYPAL_BASE}/v2/checkout/orders`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PayPal create order failed: ${errorText}`);
  }

  return await response.json();
}

async function capturePayPalOrder(orderID) {
  const accessToken = await getAccessToken();
  const response = await fetch(`${PAYPAL_BASE}/v2/checkout/orders/${orderID}/capture`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`PayPal capture failed: ${errorText}`);
  }

  return await response.json();
}

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  if (!CLIENT_ID || !CLIENT_SECRET) {
    return new Response('PayPal API credentials are required.', { status: 500 });
  }

  const body = await req.json();
  const { action, checkoutData, orderID } = body;

  try {
    if (action === 'create') {
      const order = await createPayPalOrder(checkoutData);
      return new Response(JSON.stringify(order), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    if (action === 'capture') {
      const capture = await capturePayPalOrder(orderID);
      return new Response(JSON.stringify(capture), {
        status: 200,
        headers: { 'content-type': 'application/json' }
      });
    }

    return new Response('Invalid action', { status: 400 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'content-type': 'application/json' }
    });
  }
}
