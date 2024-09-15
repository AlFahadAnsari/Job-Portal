import express from "express";
import CheckAuth from "../middleware/user.middle.js";
import {
  ApplyJob,
  getApplicants,
  getApplyJobs,
  JobStatus,
} from "../controller/application.controller.js";

const router = express.Router();

router.route("/applyjob/:id").get(CheckAuth, ApplyJob);
router.route("/get").get(CheckAuth, getApplyJobs);
router.route("/:id/applicants").get(CheckAuth, getApplicants);
router.route("/status/:id/update").post(CheckAuth, JobStatus);

export default router;
