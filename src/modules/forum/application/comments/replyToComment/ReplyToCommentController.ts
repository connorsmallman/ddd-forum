import { BaseController } from "../../../../../shared/infrastructure/http/models/BaseController";
import { ReplyToComment } from "./ReplyToComment";
import { DecodedExpressRequest } from "../../../../users/infrastructure/http/models/decodedRequest";
import { ReplyToCommentDTO } from "./ReplyToCommentDTO";
import { ReplyToCommentErrors } from "./ReplyToCommentErrors";
import { TextUtils } from "../../../../../shared/utils/TextUtils";
import * as express from 'express'

export class ReplyToCommentController extends BaseController {
  private useCase: ReplyToComment;

  constructor (useCase: ReplyToComment) {
    super();
    this.useCase = useCase;
  }

  async executeImpl (req: DecodedExpressRequest, res: express.Response): Promise<any> {
    const { userId } = req.decoded;

    const dto: ReplyToCommentDTO = {
      comment: TextUtils.sanitize(req.body.comment),
      userId: userId,
      slug: req.query.slug,
      parentCommentId: req.params.commentId
    }
  
    try {
      const result = await this.useCase.execute(dto);

      if (result.isLeft()) {
        const error = result.value;
  
        switch (error.constructor) {
          case ReplyToCommentErrors.PostNotFoundError:
            return this.notFound(res, error.errorValue().message)
          case ReplyToCommentErrors.CommentNotFoundError:
            return this.notFound(res, error.errorValue().message)
          case ReplyToCommentErrors.MemberNotFoundError:
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