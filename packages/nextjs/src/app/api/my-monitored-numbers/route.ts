import { auth } from '@clerk/nextjs';
import {
  AddMonitoredNumbersWithUserSchema,
  appendToUrl,
} from '@lottolotto/util';

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const root = process.env.BACKEND_ENDPOINT_URL;
  if (!root?.length)
    return new Response(JSON.stringify({ error: 'Admin is an idiot' }), {
      status: 500,
    });
  const url = appendToUrl(root, `/user-monitored-numbers/${userId}`);
  const res = await fetch(url, {
    cache: 'no-store',
    method: 'GET',
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

export async function POST(req: Request) {
  const { userId } = auth();
  if (!userId) {
    return new Response(JSON.stringify({ message: 'Unauthorized' }), {
      status: 401,
    });
  }

  const body = await req.json();

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
  const url = appendToUrl(root, `/user-monitored-numbers`);
  const res = await fetch(url, {
    cache: 'no-store',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });
  const response = await res?.json();
  if (!response?.success)
    return new Response(JSON.stringify({ error: 'Server error' }), {
      status: 500,
    });
  return new Response(JSON.stringify(response.success), { status: 200 });
}
