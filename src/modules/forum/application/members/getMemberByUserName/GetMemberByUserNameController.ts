
import { GetMemberByUserName } from "./GetMemberByUserName";
import { BaseController } from "../../../../../shared/infrastructure/http/models/BaseController";
import { GetMemberByUserNameDTO } from "./GetMemberByUserNameDTO";
import { GetMemberByUserNameErrors } from "./GetMemberByUserNameErrors";
import { GetMemberByUserNameResponseDTO } from "./GetMemberByUserNameResponseDTO";
import { MemberDetailsMap } from "../../../mappers/memberDetailsMap";
import * as express from 'express'
import { DecodedExpressRequest } from "../../../../users/infrastructure/http/models/decodedRequest";

export class GetMemberByUserNameController extends BaseController {
  private useCase: GetMemberByUserName;

  constructor (useCase: GetMemberByUserName) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const dto: GetMemberByUserNameDTO = {
      username: req.params.username
    }

    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case GetMemberByUserNameErrors.MemberNotFoundError:
            return this.notFound(res, error.errorValue().message)
          default:
            return this.fail(res, error.errorValue().message);
        }
        
      } else {
        const memberDetails = result.value.getValue();

        return this.ok<GetMemberByUserNameResponseDTO>(res, {
          member: MemberDetailsMap.toDTO(memberDetails)
        });
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}