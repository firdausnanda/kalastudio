import { NextResponse } from 'next/server';

export async function GET() {
  const serviceUrl = process.env.PAYMENT_GATEWAY_SERVICE;

  if (!serviceUrl) {
    return NextResponse.json({ error: 'PAYMENT_GATEWAY_SERVICE not configured' }, { status: 500 });
  }

  try {
    const response = await fetch(`${serviceUrl}/api/packages`, {
      cache: 'no-store', // Ensure we get fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch from external service: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API Packages Error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
