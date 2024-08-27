import express from "express";
import userMiddleware from "../middleware/user.middle.js";
import { adminJobs, getJobById, getJobs, postJob } from "../controller/job.controller.js";
const router = express.Router();


router.route("/postjob").post(userMiddleware,postJob);
router.route("/get").get(userMiddleware,getJobs);
router.route("/adminjob").get(userMiddleware, adminJobs);
router.route("/get/:id").get(userMiddleware ,getJobById )

export default router;
