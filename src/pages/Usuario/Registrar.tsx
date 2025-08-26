import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Registrar() {
    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        localStorage.setItem(
            "user",
            JSON.stringify({ name, email, password })
        );

        auth?.login(); 
        navigate("/registrar"); 
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow rounded">
            <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="border p-2 rounded"
                />
                <input
                    type="email"
                    placeholder="Email"
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
                    Criar Conta
                </button>
            </form>
        </div>
    );
}

export default Registrar;
