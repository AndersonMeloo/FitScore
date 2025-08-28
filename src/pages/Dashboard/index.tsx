import { useState, useEffect } from "react";

const Dashboard = () => {
    
    const [fitData, setFitData] = useState<any[]>([]);

    useEffect(() => {

        const dataStr = localStorage.getItem("fitscore");

        if (dataStr) {
            setFitData([JSON.parse(dataStr)]);
        }
    }, []);
    
    return (
        <>
            <div className="w-[80%] m-auto p-6 flex justify-center items-center mr-1">
                {fitData.length === 0 ? (
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
        </>
    );
};

export default Dashboard;
