"use client";
import { io, Socket } from "socket.io-client";
import React from "react";
//const URL: any = "http://localhost:3001";

// "undefined" means the URL will be computed from the `window.location` object
const URL: any =
  process.env.NODE_ENV === "production"
    ? "http://177.200.131.54:3001"
    : "http://localhost:3001";

const socket = io(URL);
const SocketContext = React.createContext(socket);
const SocketProvider = ({ children }: any) => {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export { SocketContext, SocketProvider };
