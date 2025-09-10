import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { ListUserController } from "./controllers/ListUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";
import prismaClient from "./prisma";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })

    fastify.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {

        await new ListUserController().handle(request, reply)
    })

    // CADASTRO
    fastify.post("/users", async (request: FastifyRequest, reply: FastifyReply) => {

        await new CreateUserController().handle(request, reply)
    })

    // LOGIN
    fastify.post("/login", async (request: FastifyRequest, reply: FastifyReply) => {

        const { email, password } = request.body as { email: string; password: string };

        try {
            const user = await prismaClient.user.findFirst({ where: { email } });

            if (!user) {
                return reply.status(404).send({ error: "Usuário não encontrado" });
            }

            if (user.password !== password) {
                return reply.status(401).send({ error: "Senha incorreta" });
            }

            // Retornarnado Somente os Dados que sera enviado para o FRONT-END
            const userForFront = {
                id: user.id,
                name: user.name,
                email: user.email
            };

            return reply.send(userForFront);

        } catch (error) {
            return reply.status(500).send({ error: "Erro interno do servidor" });
        }
    })

    // FITSCORE
    fastify.post("/fitscore", async (request: FastifyRequest, reply: FastifyReply) => {

        const { userId, score, classificacao, respostas } = request.body as {

            userId: string,
            score: number,
            classificacao: string,
            respostas: any[]
        }

        if(!userId || score === undefined || !classificacao || !respostas)  {
            return reply.status(400).send({error: 'Dados Incompletos'})
        }

        try {

            // update: Modifica o Usuário (Adiciona o FitScore).
            const updatedUser = await prismaClient.user.update({
                where: { id: userId }, // where: Busca o Usuário pelo ID
                data: {
                    scores: {
                        push: {
                            score,
                            classificacao,
                            respostas,
                            created_at: new Date()
                        }
                    }
                },
                select: { // select: Retorna os Campos
                    id: true,
                    name: true,
                    email: true,
                    scores: true
                }
            });

            return reply.send(updatedUser);
        } catch (error) {
            console.error('Erro ao salvar Fiscore:', error)
            return reply.status(500).send({ error: "Erro ao salvar FitScore" })
        }
    })

    // BUSCAR FITSCORES
    fastify.get("/fitscores/:userId", async (request: FastifyRequest, reply: FastifyReply) => {

        const { userId } = request.params as { userId: string }

        try {

            // findUnique: Lê os Dados dos Usuários (Pega os FitScores Existentes).
            const userWithScores = await prismaClient.user.findUnique({

                where: { id: userId },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    scores: true
                }   
            })

            if (!userWithScores) {
                return reply.status(404).send({ error: 'Usuário não encontrado' })
            }

            return reply.send(userWithScores.scores)
        } catch (err) {
            console.log(err)
            return reply.status(500).send({ error: "Erro ao buscas FitScores" })
        }
    })

    fastify.delete("/users/:id", async (request: FastifyRequest, reply: FastifyReply) => {

        await new DeleteUserController().handle(request, reply)
    })

    fastify.put("/users/:id", async (request: FastifyRequest, reply: FastifyReply) => {

        await new UpdateUserController().handle(request, reply)
    })
}