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

        try {

            const newFit = await prismaClient.fitScore.create({

                data: { userId, score, classificacao, respostas }
            })

            return reply.send(newFit)
        } catch (error) {
            return reply.status(500).send({ error: "Erro ao salvar FitScore" })
        }
    })

    // BUSCAR FITSCORES
    fastify.get("/fitscores/:userId", async (request: FastifyRequest, reply: FastifyReply) => {

        const { userId } = request.params as { userId: string }

        try {

            const fitscores = await prismaClient.fitScore.findMany({
                where: { userId },
                include: {
                    user: {
                        select: { id: true, name: true, email: true }
                    }
                }
            })

            return reply.send(fitscores)
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