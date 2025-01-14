
import { UpvoteComment } from "./UpvoteComment";
import { BaseController } from "../../../../../shared/infrastructure/http/models/BaseController";
import { DecodedExpressRequest } from "../../../../users/infrastructure/http/models/decodedRequest";
import { UpvoteCommentDTO } from "./UpvoteCommentDTO";
import { UpvoteCommentErrors } from "./UpvoteCommentErrors";
import * as express from 'express'

export class UpvoteCommentController extends BaseController {
  private useCase: UpvoteComment;

  constructor (useCase: UpvoteComment) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: UpvoteCommentDTO = {
      userId: userId,
      commentId: req.params.commentId
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case UpvoteCommentErrors.MemberNotFoundError:
          case UpvoteCommentErrors.PostNotFoundError:
          case UpvoteCommentErrors.CommentNotFoundError:
            return this.notFound(res, error.errorValue().message)
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