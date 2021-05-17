
import { UpdatePostStats } from "./UpdatePostStats";
import { postRepo, postVotesRepo, commentVotesRepo } from "../../../repositories";

const updatePostStats = new UpdatePostStats(
  postRepo, postVotesRepo, commentVotesRepo
)

export {
  updatePostStats
}