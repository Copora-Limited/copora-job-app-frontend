// context/SessionContext.tsx
import React, { createContext, useContext, useState, useEffect } from "react";
import { useSession } from "next-auth/react";

interface SessionContextProps {
	token: string | null;
	user: any;
}

const SessionContext = createContext<SessionContextProps | undefined>(
	undefined
);

export const SessionProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { data: session } = useSession();
	const [token, setToken] = useState<string | null>(null);
	const [user, setUser] = useState<any>(null);

	useEffect(() => {
		if (session) {
			setToken(session?.user?.token);
			setUser(session.user);
		}
	}, [session]);

	return (
		<SessionContext.Provider value={{ token, user }}>
			{children}
		</SessionContext.Provider>
	);
};

export const useSessionContext = (): SessionContextProps => {
	const context = useContext(SessionContext);
	if (!context) {
		throw new Error("useSessionContext must be used within a SessionProvider");
	}
	return context;
};
