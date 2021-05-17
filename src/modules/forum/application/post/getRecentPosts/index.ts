
import { GetRecentPosts } from "./GetRecentPosts";
import { postRepo, memberRepo } from "../../../repositories";
import { GetRecentPostsController } from "./GetRecentPostsController";

const getRecentPosts = new GetRecentPosts(postRepo);
const getRecentPostsController = new GetRecentPostsController(
  getRecentPosts
)

export {
  getRecentPosts,
  getRecentPostsController
}