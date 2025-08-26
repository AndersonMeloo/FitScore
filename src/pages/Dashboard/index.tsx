import { useState, useEffect } from "react";

const Dashboard = () => {
    const [fitData, setFitData] = useState<any[]>([]);

    useEffect(() => {
        const dataStr = localStorage.getItem("fitscore");
        if (dataStr) {
            setFitData([JSON.parse(dataStr)]); // se tiver vários, usar um array
        }
    }, []);

    return (
        <div className="w-full p-6 flex justify-center items-center">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {fitData.length === 0 ? (
                <p>Nenhum candidato avaliado ainda.</p>
            ) : (
                <table className="w-full border-collapse border">
                    <thead>
                        <tr>
                            <th className="border p-2">Nome</th>
                            <th className="border p-2">E-mail</th>
                            <th className="border p-2">FitScore</th>
                            <th className="border p-2">Classificação</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fitData.map((f, idx) => (
                            <tr key={idx}>
                                <td className="border p-2">{f.user.name}</td>
                                <td className="border p-2">{f.user.email}</td>
                                <td className="border p-2">{f.score}</td>
                                <td className="border p-2">{f.classificacao}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Dashboard;
