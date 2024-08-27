import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../constant";
import { useDispatch } from "react-redux";
import { setAllJob } from "@/redux/jobSlice";
import toast from "react-hot-toast";

const LatestJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getLatestJob = async () => {
      try {
        const res = await axios.get(BASE_URL + "/api/job/get");
        if (res.status === 200) {
          dispatch(setAllJob(res.data));
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "An error occurred");
        } else {
          toast.error("An error occurred");
        }
      }
    };
    getLatestJob();
  }, []);
};

export default LatestJob;
