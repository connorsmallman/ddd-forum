
import express from 'express';
import { middleware } from '../../../../../shared/infrastructure/http';
import { createPostController } from '../../../application/post/createPost';
import { getRecentPostsController } from '../../../application/post/getRecentPosts';
import { getPostBySlugController } from '../../../application/post/getPostBySlug';
import { getPopularPostsController } from '../../../application/post/getPopularPosts';
import { upvotePostController } from '../../../application/post/upvotePost';
import { downvotePostController } from '../../../application/post/downvotePost';

const postRouter = express.Router();

postRouter.post('/',
  middleware.ensureAuthenticated(),
  (req, res) => createPostController.execute(req, res)
)

postRouter.get('/recent',
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getRecentPostsController.execute(req, res)
)

postRouter.get('/popular',
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getPopularPostsController.execute(req, res)
)

postRouter.get('/',
  middleware.includeDecodedTokenIfExists(),
  (req, res) => getPostBySlugController.execute(req, res)
)

postRouter.post('/upvote',
  middleware.ensureAuthenticated(),
  (req, res) => upvotePostController.execute(req, res)
)

postRouter.post('/downvote',
  middleware.ensureAuthenticated(),
  (req, res) => downvotePostController.execute(req, res)
)

export {
  postRouter
}

