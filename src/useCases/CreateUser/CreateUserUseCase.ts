import { User } from "../../entities/User";
import { MailProviderInterface } from "../../providers/MailProviderInterface";
import { UserRepositoryInterface } from "../../repositories/UserRepositoryInterface";
import { CreateUserDTOInterface } from "./CreateUserDTOInterface";

export class CreateUserUseCase {
  constructor(
    private usersRepository: UserRepositoryInterface,
    private mailProvider: MailProviderInterface
  ) {}

  async execute(data: CreateUserDTOInterface) {
    const userAlreadyExists = await this.usersRepository.findByEmail(data.email)

    if (userAlreadyExists) {
      throw new Error("User already exists.")
    }

    const user = new User(data)

    await this.usersRepository.save(user)

    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email
      },
      from: {
        name: 'Equipe do Meu App',
        email: 'equipe@meuapp.com'
      },
      subject: 'Seja bem-vindo à plataforma',
      body: '<p>Você já pode fazer login em nossa plataforma.</p>'
    })
  }
}