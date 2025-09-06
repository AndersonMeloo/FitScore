import { createContext, useState, type ReactNode, } from "react";

type AuthContextType = {

    estaAutenticado: boolean;
    login: () => void;
    logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AuthProvider = ({ children }: { children: ReactNode }) => {
    
    const [estaAutenticado, setEstaAutenticado] = useState(false);

    const login = () => setEstaAutenticado(true);
    const logout = () => setEstaAutenticado(false);

    return (
        <>
            <AuthContext.Provider value={{ estaAutenticado, login, logout }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export { AuthContext, AuthProvider }
