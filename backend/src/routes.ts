import { FastifyInstance, FastifyPluginOptions, FastifyReply, FastifyRequest } from "fastify";
import { CreateUserController } from "./controllers/CreateUserController";
import { DeleteUserController } from "./controllers/DeleteUserController";
import { ListUserController } from "./controllers/ListUserController";
import { UpdateUserController } from "./controllers/UpdateUserController";

export async function routes(fastify: FastifyInstance, options: FastifyPluginOptions) {

    fastify.get("/test", async (request: FastifyRequest, reply: FastifyReply) => {
        return { ok: true }
    })

    fastify.get("/users", async (request: FastifyRequest, reply: FastifyReply) => {

        await new ListUserController().handle(request, reply)
    })

    fastify.post("/users", async (request: FastifyRequest, reply: FastifyReply) => {

        await new CreateUserController().handle(request, reply)
    })

    fastify.delete("/users/:id", async (request: FastifyRequest, reply: FastifyReply) => {

        await new DeleteUserController().handle(request, reply)
    })

    fastify.put("/users/:id", async (request: FastifyRequest, reply: FastifyReply) => {

        await new UpdateUserController().handle(request, reply)
    })
}