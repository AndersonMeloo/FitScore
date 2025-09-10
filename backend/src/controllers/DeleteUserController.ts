import { FastifyReply, FastifyRequest } from "fastify";
import { DeleteUser } from "../services/DeleteUserService";

class DeleteUserController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { id } = request.params as { id: string }

        // request.params: São os Parâmetros da URL
        // request.bod: Conteúdo Enviado no corpo da Requisição POST/PUT

        const userService = new DeleteUser()


        try {
            const user = await userService.execute({ id })

            return reply.status(200).send({
                message: 'Usuário deletado com sucesso.',
                user
            })
        } catch (error) {
            return reply.status(400).send({
                message: 'Erro ao deletar usuário',
                error: (error as Error).message
            })
        }
    }
}

export { DeleteUserController }