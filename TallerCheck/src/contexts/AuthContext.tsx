import { createContext, useContext, useState } from "react";

type Role = "taller" | "cliente" | null;

type AuthContextType = {
    role: Role;
    isLoggedIn: boolean;
    loginAsTaller: () => void;
    loginAsCliente: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children } : { children: React.ReactNode }) {
    const [role, setRole] = useState<Role>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const loginAsTaller = () => {
        setRole('taller');
        setIsLoggedIn(true);
    };

    const loginAsCliente = () => {
        setRole('cliente');
        setIsLoggedIn(true);
    }

    const logout = () => {
        setRole(null);
        setIsLoggedIn(false);
    }

    return(
        <AuthContext.Provider
        value={{
            role,
            isLoggedIn,
            loginAsTaller,
            loginAsCliente,
            logout,
        }}
        >
            { children }
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth debe usarse dentro de un AuthProvider");
    }

    return context;
}