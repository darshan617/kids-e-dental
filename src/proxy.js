import { NextResponse } from "next/server";

const locationUrl = process.env.NEXT_PUBLIC_BACKEND_BASE_URL
  ? `${process.env.NEXT_PUBLIC_BACKEND_BASE_URL.replace(/\/$/, "")}/location/check`
  : null;

export async function proxy(request) {
  const { pathname } = request.nextUrl;
  const isIndiaRestrictedRoute =
    pathname === "/my-cart" ||
    pathname.startsWith("/my-cart/") ||
    pathname === "/checkout" ||
    pathname.startsWith("/checkout/");

  if (!isIndiaRestrictedRoute) {
    return NextResponse.next();
  }

  if (!locationUrl) {
    console.error("Cannot check visitor location: NEXT_PUBLIC_BACKEND_BASE_URL is not configured");
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const headers = new Headers({ Accept: "application/json" });
    for (const headerName of ["x-forwarded-for", "x-real-ip"]) {
      const value = request.headers.get(headerName);
      if (value) headers.set(headerName, value);
    }

    const response = await fetch(locationUrl, {
      headers,
      cache: "no-store",
      signal: AbortSignal.timeout(5000),
    });

    if (!response.ok) {
      throw new Error(`Location check returned HTTP ${response.status}`);
    }

    const location = await response.json();
    if (location?.is_india !== true) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("Cannot verify visitor location for restricted route:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/my-order/:path*",
    "/my-profile/:path*",
    "/my-cart/:path*",
    "/checkout/:path*",
  ],
};
