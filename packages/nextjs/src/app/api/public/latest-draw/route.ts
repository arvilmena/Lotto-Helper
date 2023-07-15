'use server';

import { appendToUrl } from '@lottolotto/util';

export async function GET() {
  const root = process.env.BACKEND_ENDPOINT_URL;
  if (!root?.length)
    return new Response(JSON.stringify({ error: 'Admin is an idiot' }), {
      status: 500,
    });
  const url = appendToUrl(root, '/api/lotto-results');
  const res = await fetch(url);
  const response = await res?.json();
  if (!response?.success)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  return new Response(JSON.stringify(response.success), { status: 200 });
}
