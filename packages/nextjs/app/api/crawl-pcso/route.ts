export async function POST(request: Request) {
  console.log({ request });
  return new Response('Hello, from API!');
}