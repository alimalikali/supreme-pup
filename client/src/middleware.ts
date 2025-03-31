import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const authRoutes = ["/signup", "/login"];

const protectedRoutes = ["/", "/order-success", "/orders", "/cart", "/checkout", "/profile", "/products", "/products/:slug"];

const adminRoutes = ["/admin/dashboard", "/admin/orders", "/admin/products", "/admin/products/add-product", "/admin/products/edit-product/:id"];

const secretKey = new TextEncoder().encode(process.env.JWT_SECRET!);

async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, secretKey);
    return payload; // This contains the decoded user data
  } catch (error) {
    console.error("Invalid token:", error);
    return null;
  }
}

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  if (token && authRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  let isAdmin = false;
  if (token) {
    const decoded = await verifyToken(token);
    isAdmin = decoded?.isAdmin === true;
  }

  const isProtected = protectedRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/:[^/]+/g, "([^/]+)")}$`);
    return regex.test(pathname);
  });

  const isAdminRoute = adminRoutes.some((route) => {
    const regex = new RegExp(`^${route.replace(/:[^/]+/g, "([^/]+)")}$`);
    return regex.test(pathname);
  });

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/signup", req.url));
  }

  // 🚫 Non-admins cannot access admin routes
  if (isAdminRoute && !isAdmin) {
    console.log("❌ Non-admin user tried to access admin route!");
    return NextResponse.redirect(new URL("/", req.url));
  }

  // 🚫 Admins cannot access non-admin routes
  if (!isAdminRoute && isAdmin) {
    console.log("❌ Admin tried to access non-admin route!");
    return NextResponse.redirect(new URL("/admin/dashboard", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/checkout/:path*", "/login", "/signup", "/order-success", "/orders", "/cart", "/profile/:path*", "/products/:path*", "/admin/:path*", "/admin/dashboard", "/admin/orders", "/admin/products", "/admin/products/add-product", "/admin/products/edit-product/:id"],
};
