import express from "express"
import {
  createPage,
  getPageById,
  getPages,
  deletePage,
  reorderTasks,
  updatePage,
  reorderPages
} from "../controllers/pageController.js"
import { auth } from "../middleware/auth.js"

const router = express.Router()

router.post("/", auth, createPage)
router.put("/reorder", auth, reorderPages)
router.get("/", auth, getPages)
router.get("/:id", auth, getPageById)
router.put("/:id", auth, updatePage)
router.delete("/pages/:id", auth, deletePage)
router.patch("/:id/reorder-tasks", auth, reorderTasks) 

export default router;
