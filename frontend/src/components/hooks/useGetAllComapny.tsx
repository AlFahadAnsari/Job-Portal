import axios from "axios";
import { useEffect } from "react";
import { BASE_URL } from "../constant";
import { useDispatch } from "react-redux";
import { setAllComapny } from "../../redux/companySlice";
import toast from "react-hot-toast";

const useGetAllComapny = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const GetAllComapny = async () => {
      try {
        const res = await axios.get(BASE_URL + "/api/comapny/get", {
          withCredentials: true,
        });
        if (res.status === 200) {
          dispatch(setAllComapny(res.data.companies));
        }
        // console.log(res.data)
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

export default useGetAllComapny;
