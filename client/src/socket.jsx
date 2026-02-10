import { io } from "socket.io-client";
import { createContext, useContext, useMemo } from "react";
import { server } from "./constants/config";

export const socketContext = createContext(null);

export const getSocket = () => useContext(socketContext);

const SocketProvider = ({ children }) => {
  const socket = useMemo(
    () => io(server, { withCredentials: true }),
    []
  );

  return (
    <socketContext.Provider value={socket}>
      {children}
    </socketContext.Provider>
  );
};

export default SocketProvider;
