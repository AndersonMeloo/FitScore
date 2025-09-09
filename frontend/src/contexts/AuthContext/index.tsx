import { createContext, useState, type ReactNode, } from "react";

type User = {

    id: string,
    name: string,
    email: string
}

type AuthContextType = {

    estaAutenticado: boolean;
    usuario: User | null,
    login: (user: User) => void;
    logout: () => void;
};

const AuthContext = createContext({} as AuthContextType);

const AuthProvider = ({ children }: { children: ReactNode }) => {

    const [usuario, setUsuario] = useState<User | null>(null)
    const [estaAutenticado, setEstaAutenticado] = useState(false);

    const login = (user: User) => { 
        setUsuario(user)
        setEstaAutenticado(true)
    }
    const logout = () => {
        setUsuario(null)
        setEstaAutenticado(false)
    }

    return (
        <>
            <AuthContext.Provider value={{ estaAutenticado, usuario, login, logout }}>
                {children}
            </AuthContext.Provider>
        </>
    );
};

export { AuthContext, AuthProvider }
