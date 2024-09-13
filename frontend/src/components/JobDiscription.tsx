import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setSingleJob } from "@/redux/jobSlice";
import { RootState, AppDispatch } from "@/redux/store";
import { Button } from "./ui/button";
import { BASE_URL } from "./constant";
import { Loader2 } from "lucide-react";

interface Job {
  _id: string;
  title: string;
  description: string;
  position: number;
  jobType: string;
  salary: string;
  experienceLevel: string;
  location: string;
  createdAt: string;
  company: {
    name: string;
  };

}

interface JobState {
  singleJob: Job | null;
}

const JobDescription: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const { id: jobId } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();
  const { user } = useSelector((state: RootState) => state.auth);
  const { singleJob } = useSelector(
    (state: RootState) => state.job
  ) as JobState;

  const getSingleJob = async () => {
    try {
      const res = await axios.get<{ job: Job }>(
        `${BASE_URL}/api/job/get/${jobId}`,
        {
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        dispatch(setSingleJob(res.data.job));
        // setIsApplied(res.data.job.applications.some(application => application.applicant === user?._id))
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(
          (error.response.data as { message: string }).message ||
            "An error occurred"
        );
      } else {
        toast.error("An error occurred");
      }
    }
  };

  useEffect(() => {
    getSingleJob();
  }, [jobId, dispatch, user?.id]);

  const handleApply = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        BASE_URL + `/api/application/applyjob/${jobId}`,
        { withCredentials: true }
      );
      if (res.status === 201) {
        toast.success(res.data.message);
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto bg-white mt-5  p-10 md:p-5">
      <h1 className="font-bold text-xl capitalize ">{singleJob?.title || "Job Title"}</h1>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-500 font-bold text-sm border border-slate-200">
          {singleJob
            ? `${singleJob.position} opening${
                singleJob.position > 1 ? "s" : ""
              }`
            : "Loading..."}
        </Badge>
        <Badge className="text-red-500 font-bold text-sm border border-slate-200">
          {singleJob?.jobType || "Loading..."}
        </Badge>
        <Badge className="text-[#6a38c2] font-bold text-sm border border-slate-200">
          {singleJob?.salary || "Loading..."}
        </Badge>
      </div>
      <div>
        <div className="flex justify-between">
          <h1 className="text-md my-4 font-serif md:text-xl text-sm">
            {singleJob?.description || "Loading description..."}
          </h1>
          {/* <Button
            className="hover:bg-black hover:text-white bg-black text-white object-cover my-2 "
            onClick={handleApply}
          >
            Apply for job
          </Button> */}

          {loading ? (
            <Button
              disabled
              className="hover:bg-black hover:text-white bg-black text-white object-cover ml-5 mt-2 text-xs"
            >
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Please wait
            </Button>
          ) : (
            <Button
              className="hover:bg-black hover:text-white bg-black text-white object-cover ml-5 mt-2 text-xs"
              onClick={handleApply}
            >
              Apply Job
            </Button>
          )}
        </div>
        <hr />
      </div>

      <div className="text-base mt-4">
        <h1 className="font-bold">
          Role:{" "}
          <span className="font-normal pl-4">
            {singleJob?.title || "Loading..."}
          </span>
        </h1>
        <h1 className="font-bold">
          Location:{" "}
          <span className="font-normal pl-4">
            {singleJob?.location || "Loading..."}
          </span>
        </h1>
        <h1 className="font-bold">
          Description:{" "}
          <span className="font-normal pl-4">
            {singleJob?.description || "Loading..."}
          </span>
        </h1>
        <h1 className="font-bold">
          Experience:{" "}
          <span className="font-normal pl-4">
            {singleJob?.experienceLevel || "Loading..."}
          </span>
        </h1>
        <h1 className="font-bold">
          Salary:{" "}
          <span className="font-normal pl-4">
            {singleJob?.salary || "Loading..."}
          </span>
        </h1>
        <h1 className="font-bold">
          Total Applicants:{" "}
          <span className="font-normal pl-4">
            {singleJob?.position || "Loading..."}
          </span>
        </h1>
        <h1 className="font-bold">
          Post date:{" "}
          <span className="font-normal pl-4">
            {singleJob?.createdAt.split("T")[0] || "Loading..."}
          </span>
        </h1>
      </div>
    </div>
  );
};

export default JobDescription;
