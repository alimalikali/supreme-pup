import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define route categories
const authRoutes = ["/signup", "/login"]; // Routes for authentication
const publicRoutes = ["/contacts", "/faq", "/error"]; // Open to all
const protectedRoutes = ["/", "/cart", "/checkout", "/products/:id"]; // Require authentication

export function middleware(req: NextRequest) {
  // ✅ Get token from cookies
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  // ✅ Redirect logged-in users away from login/signup
  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url)); // Redirect to homepage
  }

  // ✅ Allow access to public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // ✅ Allow access to protected routes if authenticated
  if (token) {
    return NextResponse.next();
  }

  // ❌ Redirect unauthenticated users trying to access protected routes
  if (protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  return NextResponse.next();
}

// ✅ Apply middleware to all relevant routes
export const config = {
  matcher: ["/cart/:path*", "/checkout/:path*", "/products/:path*", "/", "/login", "/signup"],
};
