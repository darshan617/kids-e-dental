import { NextResponse } from "next/server";

export function proxy(request) {
  const token = request.cookies.get("userToken")?.value;
  const { pathname } = request.nextUrl;

  return NextResponse.next();
}
export const config = {
  matcher: ["/my-order/:path*", "/my-profile/:path*"],
};
