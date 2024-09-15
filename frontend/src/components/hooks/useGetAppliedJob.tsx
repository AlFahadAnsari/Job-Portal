import axios from "axios";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { BASE_URL } from "../constant";
import { useDispatch } from "react-redux";
import { setGetAppliedJob } from "@/redux/jobSlice";

const useGetAppliedJob = () => {
  const dispatch = useDispatch();
  const getAppliedJob = async () => {
    try {
      const res = await axios.get(BASE_URL + `/api/application/get`, {
        withCredentials: true,
      });
      console.log(res.data);
      if (res.status === 200) {
        dispatch(setGetAppliedJob(res.data.appliedJobs));
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
    getAppliedJob();
  });
  return <div></div>;
};

export default useGetAppliedJob;
