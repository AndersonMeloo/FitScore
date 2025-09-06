import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserService } from "../services/CreateUserService";

interface CreateUserControllerProps {
    name: string,
    email: string,
    password: string
}

class CreateUserController {

    async handle(request: FastifyRequest, reply: FastifyReply) {

        const { name, email, password } = request.body as CreateUserControllerProps

        console.log(name, email, password)

        const customerUser = new CreateUserService()

        const customer = await customerUser.execute({ name, email, password })

        reply.send(customer)
    }
}

export { CreateUserController }