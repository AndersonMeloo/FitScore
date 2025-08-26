// components/Sidebar.tsx
import { Link, useLocation } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
const Sidebar = () => {
    const { pathname } = useLocation();
    const auth = useContext(AuthContext)

    if (!auth) throw new Error("Sidebar deve estar dentro de AuthProvider")

    const linkClass = (path: string) =>
        `flex items-center gap-3 px-4 py-3 rounded hover:bg-blue-400 ${pathname === path ? "bg-blue-500 text-white" : "text-white"
        }`;

    return (
        <>
            <aside className="w-64 min-h-screen bg-blue-800 shadow-md fixed ">
                <div className="p-4 font-bold text-xl border-b text-white">FitScore LEGAL</div>
                <nav className="mt-4 flex flex-col gap-1">

                    {!auth.estaAutenticado && (
                        <>
                            <Link className={linkClass("/login")} to="/login">
                                <img className="w-6" src="./public/icons/form.png" alt="Ícone Usuário" />
                                Login
                            </Link>

                            <Link className={linkClass("/registrar")} to="/registrar">
                                <img className="w-6" src="./public/icons/form.png" alt="Ícone Usuário" />
                                Registrar
                            </Link>
                        </>
                    )}


                    {auth.estaAutenticado && (
                        <>
                            <Link className={linkClass("/dashboard")} to="/dashboard">
                                <img className="w-6" src="./public/icons/dashboard.png" alt="Ícone Dashboard" />
                                Dashboard
                            </Link>

                            <Link className={linkClass("/report")} to="/report">
                                <img className="w-6" src="./public/icons/evaluation.png" alt="Ícone Relatório" />
                                Relatório
                            </Link>
                        </>
                    )}
                </nav>
            </aside>
        </>
    );
};

export default Sidebar;
