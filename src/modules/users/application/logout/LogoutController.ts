
import { BaseController } from "../../../../shared/infrastructure/http/models/BaseController";
import { DecodedExpressRequest } from "../../infrastructure/http/models/decodedRequest";
import { LogoutUseCase } from "./LogoutUseCase";
import * as express from 'express'

export class LogoutController extends BaseController {
  private useCase: LogoutUseCase;

  constructor (useCase: LogoutUseCase) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    try {
      const result = await this.useCase.execute({ userId });

      if (result.isLeft()) {
        return this.fail(res, result.value.errorValue().message);
      } else {
        return this.ok(res);
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}