import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
// import { api } from "../../services/api";

interface Usuario {
    name: string,
    email: string,
}

interface FitScore {
    user: Usuario,
    respostas: { pergunta: string, valor: number }[],
    score: number,
    classificacao: string
}

const Dashboard = () => {

    const { usuario } = useContext(AuthContext)
    const [fitData, setFitData] = useState<FitScore[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchFitScores = async () => {

            if (!usuario) {
                alert("Usuário não esta logado!")
                setLoading(false)
                return
            }

            try {

                const response = await fetch(
                    `http://localhost:3333/fitscores/${usuario.id}`
                )
                if (!response.ok) {
                    throw new Error("Erro ao buscar FitScores");
                }

                const data = await response.json()
                setFitData(data)

            } catch (err) {
                console.log(err)
                alert("Erro ao carregar FitScores do servidor.");

            } finally {
                setLoading(false)
            }
        }

        fetchFitScores()
    }, [usuario]);


    return (
        <>

            <div className="w-[80%] m-auto p-6 flex justify-center items-center mr-1">
                {loading ? (
                    <p>Carregando FitScores...</p>
                ) : fitData.length === 0 ? (
                    <p>Nenhum candidato avaliado ainda.</p>
                ) : (
                    <table className="w-[80%] mx-auto border-collapse border">

                        <thead>
                            <tr>
                                <th className="border p-2 text-blue-800 font-bold text-2xl">Nome</th>
                                <th className="border p-2 text-blue-800 font-bold text-2xl">E-mail</th>
                                <th className="border p-2 text-blue-800 font-bold text-2xl">FitScore</th>
                                <th className="border p-2 text-blue-800 font-bold text-2xl">Classificação</th>
                            </tr>
                        </thead>

                        <tbody>
                            {fitData.map((f, idx) => (
                                <tr key={idx}>
                                    <td className="border p-2">{usuario?.name}</td>
                                    <td className="border p-2">{usuario?.email}</td>
                                    <td className="border p-2">{f.score}</td>
                                    <td className="border p-2">{f.classificacao}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
};

export default Dashboard;
