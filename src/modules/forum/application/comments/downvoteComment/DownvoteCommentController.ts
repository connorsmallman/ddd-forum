
import { BaseController } from "../../../../../shared/infrastructure/http/models/BaseController";
import { DownvoteComment } from "./DownvoteComment";
import { DecodedExpressRequest } from "../../../../users/infrastructure/http/models/decodedRequest";
import { DownvoteCommentDTO } from "./DownvoteCommentDTO";
import { DownvoteCommentErrors } from "./DownvoteCommentErrors";
import * as express from 'express';

export class DownvoteCommentController extends BaseController {
  private useCase: DownvoteComment;

  constructor (useCase: DownvoteComment) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: DownvoteCommentDTO = {
      userId: userId,
      commentId: req.params.commentId
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case DownvoteCommentErrors.MemberNotFoundError:
          case DownvoteCommentErrors.PostNotFoundError:
          case DownvoteCommentErrors.CommentNotFoundError:
            return this.notFound(res, error.errorValue().message)
          default:
            return this.fail(res, error.errorValue().message);
        }
        
      } else {
        return this.ok(res);
      }

    } catch (err) {
      return this.fail(res, err);
    }
  }
}