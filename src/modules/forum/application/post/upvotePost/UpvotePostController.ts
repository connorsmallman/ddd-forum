
import { BaseController } from "../../../../../shared/infrastructure/http/models/BaseController";
import { UpvotePost } from "./UpvotePost";
import { DecodedExpressRequest } from "../../../../users/infrastructure/http/models/decodedRequest";
import { UpvotePostDTO } from "./UpvotePostDTO";
import { UpvotePostErrors } from "./UpvotePostErrors";
import * as express from 'express'

export class UpvotePostController extends BaseController {
  private useCase: UpvotePost;

  constructor (useCase: UpvotePost) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: UpvotePostDTO = {
      userId: userId,
      slug: req.body.slug
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case UpvotePostErrors.MemberNotFoundError:
          case UpvotePostErrors.PostNotFoundError:
            return this.notFound(res, error.errorValue().message)
          case UpvotePostErrors.AlreadyUpvotedError:
            return this.conflict(res, error.errorValue().message)
          default:
            return this.fail(res, error.errorValue().message);
        }
        
      } else {
        return this.ok(res);
      }

    } catch (err) {
      return this.fail(res, err)
    }
  }
}