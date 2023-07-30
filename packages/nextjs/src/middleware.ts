import { authMiddleware } from '@clerk/nextjs';

export default authMiddleware({
  publicRoutes: [
    '/',
    '/logout',
    '/login',
    '/register',
    '/api/public/latest-draw',
    '/api/my-monitored-numbers',
  ],
  // debug: true,
});

export const config = {
  matcher: ['/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(.*)'],
};
