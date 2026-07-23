import createMiddleware from "next-intl/middleware";

export default createMiddleware({
  locales: ["en", "ar"],
  defaultLocale: "en",
  localeDetection: true,
  localePrefix: "as-needed",
});

export const config = {
  matcher: [
    "/((?!api|admin|_next/static|_next/image|images|favicon.ico).*)",
  ],
};
