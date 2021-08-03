import { User } from "../entities/User";

export interface UserRepositoryInterface {
  findByEmail(email: string): Promise<User>
  save(user: User): Promise<void>
}