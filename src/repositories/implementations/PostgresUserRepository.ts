import { User } from "../../entities/User";
import { UserRepositoryInterface } from "../UserRepositoryInterface";

export class PostgresUserRepository implements UserRepositoryInterface {
  private users: User[] = []

  async findByEmail(email: string): Promise<User> {
    const user = this.users.find(user => user.email === email)

    return user
  }

  async save(user: User): Promise<void> {
    this.users.push(user)
  }
}