
import { GetCommentByCommentId } from "./GetCommentByCommentId";
import { commentRepo, memberRepo } from "../../../repositories";
import { GetCommentByCommentIdController } from "./GetCommentByCommentIdController";

const getCommentByCommentId = new GetCommentByCommentId(
  commentRepo, memberRepo
)

const getCommentByCommentIdController = new GetCommentByCommentIdController(
  getCommentByCommentId
)

export {
  getCommentByCommentId,
  getCommentByCommentIdController
}

