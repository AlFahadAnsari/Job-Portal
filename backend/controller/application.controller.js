import { Application } from "../model/application.model.js";
import { Jobs } from "../model/job.model.js";

export const ApplyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(404).json({
        message: "Job ID not found",
      });
    }

    const alreadyApplied = await Application.findOne({
      job: jobId,
      applicant: userId,
    });

    if (alreadyApplied) {
      return res.status(400).json({
        message: "Already applied",
      });
    }

    const jobExist = await Jobs.findById(jobId);

    if (!jobExist) {
      return res.status(404).json({
        message: "Job does not exist",
      });
    }

    const newApplication = await Application.create({
      job: jobId,
      applicant: userId,
    });

    // Ensure `application` array exists in the job document
    if (!jobExist.application) {
      jobExist.application = [];
    }

    jobExist.application.push(newApplication._id);

    // Save the updated job document
    await jobExist.save();

    return res.status(201).json({
      message: "Application successful",
      application: newApplication,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const getApplyJobs = async (req, res) => {
  try {
    const userId = req.id;

    const appliedJobs = await Application.find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        populate: {
          path: "company",
        },
      });

    if (appliedJobs.length === 0) {
      return res.status(400).json({
        message: "You have not applied for any jobs yet",
      });
    }

    return res.status(200).json({
      message: "Jobs retrieved successfully",
      jobs: appliedJobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Server error",
    });
  }
};

export const appliyListByAdmin = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await Jobs.findById(jobId).populate({
      path: "application",
      option: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
      },
    });

    if (!job) {
      return (
        res.status(400),
        json({
          message: "job not available",
        })
      );
    }

    return res.status(200).json({
      message: "successfull get",
    });
  } catch (error) {
    console.log(error);
  }
};

export const JobStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;

    if (!status) {
      return res.status(400).json({
        message: "status is require",
      });
    }

    const findOutApplication = await Application.findOne({
      _id: applicationId,
    });
    if (!findOutApplication) {
      return res.status(400).json({
        message: "You have not applied for any jobs yet",
      });
    }

    findOutApplication.status = status.toLowerCase()
    await findOutApplication.save()

    return res.status(200).json({
      message:"success"
    })
    
  } catch (error) {
    console.log(error);
  }
};
