import Navbar from "@/shared/Navbar";
import ApplicationTbale from "./ApplicationTbale";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "@/components/constant";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicant";
import { useParams } from "react-router-dom";
import { RootState } from "@/redux/store";


const Applicants = () => {
  const dispatch = useDispatch();
  const param = useParams();

  const { applicants } = useSelector((state: RootState) => state.applicant );
  const getApplicant = async () => {
    try {
      const res = await axios.get(
        BASE_URL + `/api/application/${param.id}/applicants`,
        {
          withCredentials: true,
        }
      );
      console.log(res.data);
      if (res.status === 200) {
        dispatch(setApplicants(res.data.job));
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
    getApplicant();
  }, []);
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto p-5">
        <h1 className="font-medium">{ applicants && applicants?.application?.length }</h1>

        <div className="mt-5">
          <ApplicationTbale />
        </div>
      </div>
    </div>
  );
};

export default Applicants;
