import express from "express";
const router = express.Router();
import { getAllPosts, getPostDetail, createPostApi, updatePost, deletePost } from "../controllers/postController";
import upload from "../helpers/fileUpload"

router.get("/", getAllPosts)
router.post("/", createPostApi)
router.get("/:postId", getPostDetail)
router.put("/:postId", updatePost)
router.delete("/:postId", deletePost)

export default router;