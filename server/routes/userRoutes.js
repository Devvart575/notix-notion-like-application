import express from "express"
import { signup, login, getMe } from "../controllers/userController.js"
import { auth } from "../middleware/auth.js"; // protect routes

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/me", auth, getMe);


export default router;