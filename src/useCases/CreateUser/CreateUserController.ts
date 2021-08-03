import { Request, Response } from "express"
import { CreateUserUseCase } from "./CreateUserUseCase"

export class CreateUserController {
  constructor(
    private createUserUseCase: CreateUserUseCase
  ) {}

  async handle(req: Request, res: Response): Promise<Response> {
    const { name, email, password } = req.body
    
    try {
      await this.createUserUseCase.execute({
        name,
        email,
        password
      })

      return res.status(201).json({
        error: false,
        data: {
          name,
          email,
        }
      })
    } catch (err) {
      return res.status(400).json({
        error: true,
        message: err.message || "Unexpected error."
      })
    }
  }
}