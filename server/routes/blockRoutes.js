import express from "express";
import {
  createBlock,
  getBlockByPage,
  updateBlock,
  deleteBlock,
  reorderBlocks,
} from "../controllers/blockController.js";

const router = express.Router();

router.post("/", createBlock);
router.get("/page/:pageId", getBlockByPage);

//  static route comes BEFORE dynamic one
router.patch("/reorder", reorderBlocks); // used by drag-and-drop

router.patch("/:id", updateBlock);
router.delete("/:id", deleteBlock);

export default router;
