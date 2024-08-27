import { useParams } from "react-router-dom";
import { Badge } from "./ui/badge";
import { useEffect } from "react";
import { BASE_URL } from "./constant";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { setSingleJob } from "@/redux/jobSlice";
import { RootState } from "@/redux/store";

interface Job {
  _id: string;
  title: string;
  description: string;
  position: number;
  jobType: string;
  salary: string;
  company: {
    name: string;
  };
}

const JobDiscription = () => {
  const param = useParams();
  const jobId = param.id;
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.auth);
  const { singleJob } = useSelector((state: RootState) => state.job);

  const getSingleJob = async () => {
    try {
      const res = await axios.get<Job>(`${BASE_URL}/api/job/get/${jobId}`, {
        withCredentials: true,
      });
      if (res.status === 200) {
        dispatch(setSingleJob(res.data));
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  useEffect(() => {
    getSingleJob();
  }, [jobId, dispatch, user?.id]);
  
  return (
    <div className="max-w-7xl mx-auto bg-white mt-5 text-xl">
      <h1 className="font-bold">Title</h1>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-500 font-bold text-sm border border-slate-200">
          12 opening
        </Badge>
        <Badge className="text-red-500 font-bold text-sm border border-slate-200">
          part time
        </Badge>
        <Badge className="text-[#6a38c2] font-bold text-sm border border-slate-200 ">
          12 Lpa
        </Badge>
      </div>

      <div>
        <h1 className="text-md my-4 font-serif">{singleJob?.description}</h1>
        <hr />
      </div>

      <div className="text-base mt-4">
        <h1 className="font-bold">
          Role : <span className="font-normal pl-4">Front-end developer</span>
        </h1>
        <h1 className="font-bold">
          Location : <span className="font-normal pl-4">Andheri</span>
        </h1>
        <h1 className="font-bold">
          Description :{" "}
          <span className="font-normal pl-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis,
            molestias.
          </span>
        </h1>
        <h1 className="font-bold">
          experience : <span className="font-normal pl-4">0 - 2 years</span>
        </h1>
        <h1 className="font-bold">
          salary : <span className="font-normal pl-4"> 3 Lpa</span>
        </h1>
        <h1 className="font-bold">
          Totall Applicants : <span className="font-normal pl-4">4</span>
        </h1>
        <h1 className="font-bold">
          Post date : <span className="font-normal pl-4">17-10-24</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDiscription;
