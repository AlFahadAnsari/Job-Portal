import { BASE_URL } from "@/components/constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SetSingleCompany } from "../redux/companySlice";
import Navbar from "@/shared/Navbar";
import axios from "axios";
import { ArrowBigLeft } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

type Inputs = {
  companyName: string;
};

const CompaniesCreate = () => {
  const navi = useNavigate();
  const { register, handleSubmit, reset } = useForm<Inputs>();
  const dipatch = useDispatch();

  // const { singleCompany } = useSelector((state: RootState) => state.company);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post(BASE_URL + "/api/comapny/register", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        const companyId = res?.data?.company._id;
        navi(`/admin/companies/${companyId}`);
        dipatch(SetSingleCompany(res.data));
        reset();
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="max-w-4xl mx-auto mt-20 ">
        <h1 className="font-bold text-md md:text-2xl">
          Enter Your Company Name
        </h1>
        <p>
          What whould you like to give your company Name ? you can chnage this
          later
        </p>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-10">
          <div>
            <Label className="">Comapny Name</Label>
            <Input
              type="text"
              className="mt-2"
              {...register("companyName", {
                required: " Comapny name is required",
              })}
            />
          </div>
          <div className="flex ">
            <div>
              <Button
                type="submit"
                variant={"outline"}
                className=" mt-4 mr-5"
                onClick={() => navi("/admin/companies")}
              >
                <ArrowBigLeft /> back
              </Button>
            </div>

            <div>
              <Button
                type="submit"
                className="bg-black text-white hover:bg-black hover:text-white mt-4 "
              >
                Add
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CompaniesCreate;
