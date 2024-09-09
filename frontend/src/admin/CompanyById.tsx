import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Navbar from "@/shared/Navbar";
import { ArrowLeftSquare } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "@/components/constant";
import toast from "react-hot-toast";
import { RootState } from "@/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { SetSingleCompany } from "@/redux/companySlice";


type Inputs = {
  companyName: string;
  description: string;
  website: string;
  location: string;
  logo: FileList;
};

const CompanyById = () => {
  const { singleCompany } = useSelector((state: RootState) => state.company);
  const param = useParams();
  const navi = useNavigate();
  const dispatch = useDispatch()
  const { register, handleSubmit, reset, setValue } = useForm<Inputs>();


  const GetAllComapny = async () => {
    try {
      const res = await axios.get(
        BASE_URL + `/api/comapny/get/${param?.id}`,
        {
          withCredentials: true,
        }
      );
      if (res.status === 200) {
        dispatch(SetSingleCompany(res.data.findComanyId));
      }
      // console.log(res.data.findComanyId);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  useEffect(()=>{
    GetAllComapny()
  },[param,dispatch])

  useEffect(() => {
    setValue("companyName", singleCompany?.name || "");
    setValue("description", singleCompany?.description || "");
    setValue("location", singleCompany?.location || "");
    setValue("website", singleCompany?.website || "");
  }, [singleCompany]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const formData = new FormData();

    formData.append("companyName", data.companyName);
    formData.append("description", data.description);
    formData.append("location", data.location);
    formData.append("website", data.website);

    if (data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }

    try {
      const res = await axios.put(
        BASE_URL + `/api/comapny/update/${param?.id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        navi("/admin/companies");
        toast.success(res.data.message);

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

      <div className="max-w-4xl mx-auto mt-20 p-5">
        <div className="flex gap-16">
          <div
            className=" flex cursor-pointer gap-3"
            onClick={() => navi("/admin/companies")}
          >
            <ArrowLeftSquare /> <span>Back</span>
          </div>
          <span className="font-bold text-sm  md:text-xl">Company Setup</span>
        </div>

        {/* Form   */}

        <form
          className="  md:mt-10 bg-white shadow-md  p-10 border-black "
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* fist */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg-grid-col-2 gap-10">
            <div>
              <Label>Comapny Name</Label>
              <Input
                type="text"
                {...register("companyName", {
                  required: " Comapny name is required",
                })}
              />
            </div>

            <div>
              <Label>Description</Label>
              <Input
                type="text"
                {...register("description", {
                  required: "  description is required",
                })}
              ></Input>
            </div>
          </div>

          {/* second */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg-grid-col-2 gap-10 mt-2">
            <div>
              <Label>Website</Label>
              <Input
                type="text"
                {...register("website", {
                  required: " website  is required",
                })}
              ></Input>
            </div>

            <div>
              <Label>Loaction</Label>
              <Input
                type="text"
                {...register("location", {
                  required: " loaction  is required",
                })}
              ></Input>
            </div>
          </div>

          {/* second */}
          <div className="grid sm:grid-cols-1 md:grid-cols-2 lg-grid-col-2 gap-10 mt-3">
            <div>
              <Label>Logo</Label>
              <Input type="file" {...register("logo")}></Input>
            </div>
          </div>

          <Button
            type="submit"
            className="bg-black text-white hover:bg-black hover:text-white w-full mt-10"
          >
            Add
          </Button>
        </form>
      </div>
    </div>
  );
};

export default CompanyById;
