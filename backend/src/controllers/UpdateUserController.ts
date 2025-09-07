import { FastifyReply, FastifyRequest } from "fastify";
import { UpdateUserService } from "../services/UpdateUserService";

interface UpdateUserProps {

    name?: string,
    email?: string,
    password?: string
}

class UpdateUserController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        // Recebe os Dados
        // request.params: Pega os Dados da URL
        const { id } = request.params as { id: string }
        const { name, email, password } = request.body as UpdateUserProps

        const updateUserService = new UpdateUserService()

        try {
            const user = await updateUserService.execute({

                id,
                name,
                email,
                password
            })

            return reply.send(user)
        } catch (error: any) {
            return reply.status(404).send({ error: error.message })
        }
    }
}

export { UpdateUserController }