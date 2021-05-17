
import { UpdateCommentStats } from "./UpdateCommentStats";
import { commentRepo, commentVotesRepo } from "../../../repositories";

const updateCommentStats = new UpdateCommentStats(commentRepo, commentVotesRepo);

export {
  updateCommentStats
}
