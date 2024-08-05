import mongoose from "mongoose";

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  requirement: [
    {
      type: String,
      require: true,
    },
  ],
  salary: {
    type: Number,
    require: true,
  },
  jobType: {
    type: String,
    require: true,
  },
  position: {
    type: Number,
    require: true,
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Company",
    require: true,
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    require: true,
  },
  application: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "application",
    },
  ],
},{timestamps:true});

export const Job = mongoose.model("Job" , jobSchema)