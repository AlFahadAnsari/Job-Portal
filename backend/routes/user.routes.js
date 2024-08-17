import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controller/user.controller.js";
import userMiddleware from "../middleware/user.middle.js";
import { SignleUplaod } from "../middleware/multer.js";
const router = express.Router();

router.route("/register").post(SignleUplaod , register);
router.route("/login").post(login);
router.route("/profile/update").get(userMiddleware, updateProfile);
router.route("/logout").post(logout)

export default router;
