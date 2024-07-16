import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { commentOnPost, createPost, deletePost, getAllPost , getLikedPosts, likeUnlikePost } from '../controllers/post.controller.js';

const router = express.Router();

router.get("/all",protectRoute,getAllPost);
router.get("/likes/:id",protectRoute,getLikedPosts)
router.post("/create",protectRoute,createPost);
router.post("/like/:id",protectRoute,likeUnlikePost);
router.post("/comment/:id",protectRoute,commentOnPost);
router.delete("/:id",protectRoute,deletePost);

export default router;
