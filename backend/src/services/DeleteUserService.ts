import prismaClient from "../prisma";

interface DeleteUserProps {
    id: string
}

class DeleteUser {

    async execute({ id }: DeleteUserProps) {

        if (!id) {
            throw new Error('Solitação invalida!')
        }

        const findUser = await prismaClient.user.findFirst({

            where: {
                id: id
            }
        })

        if (!findUser) {
            throw new Error('Usuário invalido!')
        }

        await prismaClient.user.delete({

            where: {
                id: findUser.id
            }
        })
        return { message: 'Usuário deletado com sucesso!' }
    }
}

export { DeleteUser }