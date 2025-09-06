// components/Sidebar.tsx
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../contexts/AuthContext";

const Sidebar = () => {

    const { pathname } = useLocation();
    const navigate = useNavigate()
    const [mostrarBotaoLogin, setMostrarBotaoLogin] = useState(true)
    const auth = useContext(AuthContext)

    if (!auth) throw new Error("Sidebar deve estar dentro de AuthProvider")

    const linkClass = (path: string) =>
        `flex items-center gap-3 px-4 py-3 rounded hover:bg-blue-400 ${pathname === path ? "bg-blue-500 text-white" : "text-white"
        }`;

    const handleLoginClick = () => {
        setMostrarBotaoLogin(false)
        navigate('/login')
    }

    const handleRegisterClick = () => {
        setMostrarBotaoLogin(false)
        navigate('/registrar')
    }

    return (
        <>
            <aside className="w-64 min-h-screen bg-blue-800 shadow-md fixed ">

                <div className="p-4 font-bold text-xl border-b text-white">FitScore LEGAL</div>

                <nav className="mt-4 flex flex-col gap-1">
                    {!auth.estaAutenticado && (
                        <>

                            <Link className={linkClass("/login")} to="/login">
                                <img className="w-6" src="icons/form.png" alt="Ícone Usuário" />
                                Login
                            </Link>

                            <Link className={linkClass("/registrar")} to="/registrar">
                                <img className="w-6" src="icons/form.png" alt="Ícone Usuário" />
                                Registrar
                            </Link>
                        </>
                    )}

                    {auth.estaAutenticado && (
                        <>
                            <Link className={linkClass("/dashboard")} to="/dashboard">
                                <img className="w-6" src="icons/dashboard.png" alt="Ícone Dashboard" />
                                Dashboard
                            </Link>

                            <Link className={linkClass("/form")} to="/form">
                                <img className="w-6" src="icons/form.png" alt="Ícone Relatório" />
                                Formulário
                            </Link>

                            <Link className={linkClass("/report")} to="/report">
                                <img className="w-6" src="icons/evaluation.png" alt="Ícone Relatório" />
                                Relatório
                            </Link>
                        </>
                    )}
                </nav>
            </aside>

            {mostrarBotaoLogin && pathname !== '/login' && pathname !== '/registrar' && pathname !== '/dashboard' && pathname !== '/form' && pathname !== '/report' && (
                <div className="w-full mx-auto text-center flex items-center justify-center gap-4">
                    
                    <button
                        onClick={handleLoginClick}
                        className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Login
                    </button>

                    <button
                        onClick={handleRegisterClick}
                        className="text-white bg-blue-600 px-4 py-2 rounded hover:bg-blue-700 transition"
                    >
                        Cadastrar
                    </button>
                </div>
            )}
        </>
    );
};

export default Sidebar;
