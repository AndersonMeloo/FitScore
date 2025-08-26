import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Login() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [erro, setErro] = useState("");

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();

        const userStr = localStorage.getItem("user");

        if (!userStr) {
            setErro("Nenhum usuário cadastrado");
            return;
        }

        const user = JSON.parse(userStr);

        if (user.email === email && user.password === password) {
            auth?.login();
            navigate("/form");
        } else {
            setErro("E-mail ou senha incorretos");
        }
    };

    return (
        <>
            <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
                <h1 className="text-2xl font-bold mb-4">Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {erro && <div className="text-red-600">{erro}</div>}
                    <input
                        type="email"
                        placeholder="E-mail"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="border p-2 rounded"
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="border p-2 rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        Entrar
                    </button>
                </form>
            </div>
        </>
    );
}

export default Login;
