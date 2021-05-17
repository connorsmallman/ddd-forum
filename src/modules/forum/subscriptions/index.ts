
import { createMember } from "../application/members/createMember";
import { AfterUserCreated } from "./afterUserCreated";
import { AfterCommentPosted } from "./afterCommentPosted";
import { updatePostStats } from "../application/post/updatePostStats";
import { AfterCommentVotesChanged } from "./afterCommentVotesChanged";
import { updateCommentStats } from "../application/comments/updateCommentStats";
import { AfterPostVotesChanged } from "./afterPostVotesChanged";

// Subscriptions
new AfterUserCreated(createMember);
new AfterCommentPosted(updatePostStats);
new AfterCommentVotesChanged(updatePostStats, updateCommentStats);
new AfterPostVotesChanged(updatePostStats);