import express from "express";
import {
  companyUpadte,
  GetComapny,
  getComapnyById,
  RegisterCompany,
} from "../controller/company.controller.js";
import CheckAuth from "../middleware/user.middle.js";
import { SignleUplaod } from "../middleware/multer.js";

const router = express.Router();

router.route("/register").post(CheckAuth, RegisterCompany);
router.route("/get").get(CheckAuth, GetComapny);
router.route("/get/:id").get(CheckAuth, getComapnyById);
router.route("/update/:id").put(CheckAuth, SignleUplaod, companyUpadte);

export default router;
