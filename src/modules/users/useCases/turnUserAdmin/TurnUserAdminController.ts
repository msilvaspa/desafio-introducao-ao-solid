import { Request, Response } from "express";

import { TurnUserAdminUseCase } from "./TurnUserAdminUseCase";

class TurnUserAdminController {
  constructor(private turnUserAdminUseCase: TurnUserAdminUseCase) { }

  handle(request: Request, response: Response): Response {
    try {
      const user = this.turnUserAdminUseCase.execute({
        user_id: request.params.user_id,
      });
      return response.status(200).json(user);
    } catch (error) {
      return response.status(404).json({ error: "User not found" });
    }
  }
}

export { TurnUserAdminController };
