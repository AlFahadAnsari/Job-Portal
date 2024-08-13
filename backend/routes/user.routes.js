import express from "express";
import {
  login,
  logout,
  register,
  UpdateProfile,
} from "../controller/user.controller.js";
import userMiddleware from "../middleware/user.middle.js";
const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/profile/update").get(userMiddleware, UpdateProfile);
router.route("/logout").post(logout)

export default router;
