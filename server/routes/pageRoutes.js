import express from "express"
import {createPage, getPageById, getPages, deletePage} from "../controllers/pageController.js"

const router = express.Router()

router.post("/", createPage)
router.get("/", getPages)
router.get("/:id", getPageById)
router.delete("/pages/:id", deletePage)


export default router;