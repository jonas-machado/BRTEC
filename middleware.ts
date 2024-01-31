export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/config/manual",
    // "/monitoring/:path",
    // "/network/:path",
    // "/script/:path",
    // "/solutionBank/:path",
    "/public/:path",
  ],
};
