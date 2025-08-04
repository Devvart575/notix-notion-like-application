import express from "express"
import {createBlock, getBlockById} from "../controllers/blockController.js";

const router = express.Router();

router.post("/", createBlock)
router.get("/page/:pageId", getBlockById)


export default router;