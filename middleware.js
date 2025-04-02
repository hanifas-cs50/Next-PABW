import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  console.log("Middleware is running: ", req.nextUrl.pathname);

  const path = req.nextUrl.pathname;
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  if (!token) {
    if (path.includes("/signin") || path.includes("/signup")) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  const userRole = token.role; // Ensure role is stored in the token during login
  console.log("User Role: ", userRole);

  if ((path.includes("/signin") || path.includes("/signup")) && userRole) {
    if (userRole === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    } else {
      return NextResponse.redirect(new URL("/home/profile", req.url));
    }
  }

  if (path.startsWith("/home") && userRole === "admin") {
    return NextResponse.redirect(new URL("/admin", req.url));
  }
  
  if (path.startsWith("/admin") && userRole === "user") {
    return NextResponse.redirect(new URL("/home/profile", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/signup", "/home/:path*", "/admin/:path*"], // Ensures all subpaths are matched
};
