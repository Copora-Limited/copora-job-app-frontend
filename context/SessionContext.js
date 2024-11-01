import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

const SessionContext = createContext(null);

export const SessionProvider = ({ children }) => {
  const { data: session } = useSession();
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (session) {
      setToken(session.user?.token || null);
      setUser(session.user);
    }
  }, [session]);

  return (
    <SessionContext.Provider value={{ token, user }}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSessionContext = () => {
  const context = useContext(SessionContext);
  if (!context) {
    throw new Error("useSessionContext must be used within a SessionProvider");
  }
  return context;
};
