import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function middleware(req) {
  const cookieStore = await cookies();
  const token = cookieStore.get("authToken");
  const pathname = req.nextUrl.pathname;

  const protectedRoutes = [
    "/home",
    "/profile",
    "/about",
    "/courses",
    "/help",
    "/student-record",
    "/current-semester",
  ];

  // Redirect to login if accessing protected route without token
  if (protectedRoutes.includes(pathname) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next(); // Proceed if authenticated or on public routes
}

export const config = {
  matcher: [
    "/home",
    "/profile",
    "/about",
    "/courses",
    "/help",
    "/student-record",
    "/current-semester",
  ],
};
