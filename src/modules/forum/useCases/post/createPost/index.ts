
import { CreatePost } from "./CreatePost";
import { postRepo, memberRepo } from "../../../repositories";
import { CreatePostController } from "./CreatePostController";

const createPost = new CreatePost(postRepo, memberRepo);
const createPostController = new CreatePostController(
  createPost
);

export { 
  createPost,
  createPostController
}

