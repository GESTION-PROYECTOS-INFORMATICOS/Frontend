import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/login",
  },
});

export const config = {
  matcher: [
    // Aplica la protección a todas las rutas excepto las públicas
    "/((?!api/auth|login|favicon.ico|_next/static|_next/image|images|icons).*)",
  ],
};
