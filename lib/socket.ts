import { io } from "socket.io-client";

// const URL: any = "http://localhost:3001";

// "undefined" means the URL will be computed from the `window.location` object
const URL: any =
  process.env.NODE_ENV === "production"
    ? "http://177.200.131.54:3001"
    : "http://localhost:3001";

export const socket = io(URL);
