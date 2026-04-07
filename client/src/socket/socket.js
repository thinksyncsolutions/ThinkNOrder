import { io } from "socket.io-client";

const socketURL = import.meta.env.VITE_SOCKET_URL;

export const socket = io(socketURL, {
  autoConnect: false, // important
});