import { Jobs } from "../model/job.model.js";

export const postJob = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;

    const userId = req.id;

    if (!userId) {
      return res.status(400).json({
        message: "id is empty",
      });
    }

    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res.status(400).json({
        message: "Somethin is missing.",
        success: false,
      });
    }
    const job = await Jobs.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experienceLevel: experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res.status(201).json({
      message: "New job created successfully.",
      job,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

// for student search query

export const getJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { description: { $regex: keyword, $options: "i" } },
      ],
    };

    const jobs = await Jobs.find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });

    if (!jobs) {
      return res.status(404).json({
        message: "Jobs not found.",
        success: false,
      });
    }

    return res.status(200).json({
      jobs,
      success: true,
    });

  } catch (error) {
    console.error("Error fetching jobs:", error); // Improved error logging
    return res.status(500).json({
      message: "An error occurred while fetching jobs.",
      success: false,
    });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.param.id;
    const findJobId = await Jobs.find(jobId);

    if (!findJobId) {
      return res.status(404).json({
        message: "job not found",
      });
    }

    return res.status(200).json({
      findJobId,
    });
  } catch (error) {
    console.log(error);
  }
};

export const adminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const findAdminJobs = await Jobs.find({ created_by: adminId });

    if (!findAdminJobs) {
      return res.status(404).json({
        message: "job not found",
      });
    }

    return res.status(200).json({
      findAdminJobs,
    });
  } catch (error) {
    console.log(error);
  }
};
