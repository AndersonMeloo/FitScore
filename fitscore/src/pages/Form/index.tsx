import { useState } from "react"
import { useNavigate } from "react-router-dom"

type Resposta = {
    pergunta: string,
    valor: number,
}

const perguntas = {
    performance: [
        'Experiência',
        'Entregas',
        'Habilidades'
    ],

    energia: [
        'Disponibilidade',
        'Prazos',
        'Pressão'
    ],

    cultura: [
        "Valores da LEGAL",
        "Trabalho em equipe",
        "Proatividade",
        "Comunicação"
    ]
}

const Form = () => {

    // Object.values - Joga todos em uma Array 
    // .flat() - Coloca todos em um Array Único de Strings
    // every() - Verifica se todos estão na mesma condição
    const perguntasBloco = Object.values(perguntas).flat()
    const [respostas, setRespostas] = useState<Resposta[]>(
        perguntasBloco.map(pergunta => ({
            pergunta,
            valor: 0
        }))
    )

    // bloco: string,
    const handleChange = (pergunta: string, valor: number) => {

        setRespostas(prev => {
            const other = prev.filter(r => r.pergunta !== pergunta)
            return [...other, { pergunta, valor }]
        })
    }

    const todasRespondidas = respostas.every(r => r.valor > 0)

    const calcularFitScore = () => {
        const total = respostas.reduce((acc, r) => acc + r.valor, 0)
        const score = Math.round((total / (10 * 5)) * 100)
        return score
    }

    const getClassificacao = (score: number) => {
        if (score >= 80) return 'Fit Altíssimo';
        if (score >= 60) return 'Fit Aprovado';
        if (score >= 40) return 'Fit Questionável';
        return 'Fora do Perfil'
    }

    const [loading, setLoading] = useState(false)
    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault()

        const score = calcularFitScore()
        const classificacao = getClassificacao(score)

        const userStr = localStorage.getItem("user")
        const user = userStr ? JSON.parse(userStr) : {};

        localStorage.setItem('fitscore', JSON.stringify({
            user,
            respostas,
            score,
            classificacao
        }))

        alert(`FitScore: ${score}\nClassificação: ${classificacao}`)

        setLoading(true)
        setTimeout(() => {
            navigate("/dashboard");
        }, 2000);
    }

    const navigate = useNavigate()

    // const handleSubmitForm = () => {
    //     navigate('/dashboard')
    // }

    return (
        <>
            <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded">

                <h1 className="text-2xl font-bold mb-4">Formulário FitScore</h1>

                {loading ? (
                    <div className="flex items-center justify-center h-screen">
                        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                        <span className="ml-3 text-blue-600 font-semibold">
                            Carregando...
                        </span>
                    </div>
                ) : (

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">

                        {Object.entries(perguntas).map(([bloco, perguntasBloco]) => (

                            <div key={bloco} className="mb-4">

                                {/* <h2 className="font-semibold text-lg capitalize">{bloco}</h2> */}

                                {perguntasBloco.map((pergunta) => (

                                    <div key={pergunta} className="flex items-center gap-2 mt-2">

                                        <label className="flex-1">{pergunta}</label>

                                        <select
                                            required
                                            className="border p-1 rounded"
                                            // bloco
                                            onChange={(e) => handleChange(pergunta, parseInt(e.target.value))}
                                        >
                                            <option value="">Selecione</option>
                                            {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                                        </select>
                                    </div>
                                ))}
                            </div>
                        ))}

                        <button
                            onClick={() => {
                                if (!todasRespondidas) {
                                    return
                                }
                            }}
                            className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                        >
                            Enviar
                        </button>
                    </form>
                )}
            </div>
        </>
    )
}
export default Form;