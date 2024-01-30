export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/monitoring/:path*", "/public/:path"],
};
