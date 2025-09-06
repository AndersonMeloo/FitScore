import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/teste", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })

    fastify.post("/users", async (request: FastifyRequest, reply: FastifyReply) => {

        await new CreateUserController().handle(request, reply)
    })
}