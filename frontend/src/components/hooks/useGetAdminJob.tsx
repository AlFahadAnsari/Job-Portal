import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../constant";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { setGetAdminJob } from "@/redux/jobSlice";

const useGetAdminJob = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const GetAllComapny = async () => {
      try {
        const res = await axios.get(BASE_URL + "/api/job/adminjob", {
          withCredentials: true,
        });
        // console.log(res.data)
        if (res.status === 200) {
          dispatch(setGetAdminJob(res.data.jobs));
        }
        
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          toast.error(error.response.data.message || "An error occurred");
        } else {
          toast.error("An error occurred");
        }
      }
    };
    GetAllComapny();
  }, []);
};

export default useGetAdminJob;
