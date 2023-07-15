'use server';

import { auth } from '@clerk/nextjs';
import {
  AddMonitoredNumbersWithUserSchema,
  appendToUrl,
} from '@lottolotto/util';

export async function POST(request: Request) {
  const { userId } = auth();
  const body = await request.json();
  console.log({ userId });
  console.log({ body });
  const payload = {
    ...body,
    userId,
  };
  AddMonitoredNumbersWithUserSchema.parse(payload);

  const root = process.env.BACKEND_ENDPOINT_URL;
  if (!root?.length)
    return new Response(JSON.stringify({ error: 'Admin is an idiot' }), {
      status: 500,
    });
  const url = appendToUrl(root, '/api/user-monitored-numbers');
  const res = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const response = await res?.json();
  if (!response?.success)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  return new Response(JSON.stringify(response.success), { status: 200 });
}
