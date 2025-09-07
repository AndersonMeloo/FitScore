import prismaClient from "../prisma"

interface UpdateUserProps {

    id: string,
    name?: string,
    email?: string,
    password?: string
}

class UpdateUserService {

    async execute({ id, name, email, password }: UpdateUserProps) {

        if (!id) {
            throw new Error("ID do usuário é obrigatório!")
        }

        // Verificando se o Usuário Existe
        // findUnique = Procura um único Registro no Banco de Dados
        const userExists = await prismaClient.user.findUnique({

            // where() filtra, procura o dado que estou informando
            where: { id }
        })

        if (!userExists) {
            throw new Error("Usuário não encontrado.")
        }

        const updateUser = await prismaClient.user.update({

            where: { id },
            data: {
                name: name ?? userExists.name,
                email: email ?? userExists.email,
                password: password ?? userExists.password
            }
        })

        return updateUser
    }
}

export { UpdateUserService }