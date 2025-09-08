import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import Input from "../../components/ui/input";
import { api } from "../../services/api";
import { AxiosError } from "axios";

function Registrar() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate();
    const auth = useContext(AuthContext);

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault()
        setLoading(true)

        try {

            const response = await api.post("/users", {
                name,
                email,
                password
            })

            console.log('Usuario cadastrado', response.data)

            auth.login(response.data)
            navigate('/form')

        } catch (err: unknown) {

            if (err instanceof AxiosError) {

                console.log('Erro ao criar usuário', err.response?.data || err.message)
                alert(err.response?.data || 'Erro ao cadastrar usuario')
            } else if (err instanceof Error) {

                alert(err.message)
                console.log("Erro ao criar usuário", err.message)
            } else {

                console.log("Erro desconhecido", err);
                alert("Erro desconhecido ao cadastrar usuario");
            }
        } finally {
            setLoading(false)
        }
    }

    return (

        <>
            {loading ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                    <span className="ml-3 text-blue-600 font-semibold">
                        Carregando...
                    </span>
                </div>
            ) : (
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
                        <Input
                            placeholder="Senha"
                            value={password}
                            onChange={(val) => setPassword(val)}
                            required
                            password
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
            )}
        </>
    );
}

export default Registrar;
