import { BASE_URL } from "@/components/constant";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RootState } from "@/redux/store";
import Navbar from "@/shared/Navbar";
import axios from "axios";
import { ArrowBigLeft, Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

type Inputs = {
  title: string;
  description: string;
  requirements: [];
  salary: string;
  location: string;
  jobType: string;
  experience: string;
  position: string;
  companyId: string;
};

const PostAdminJob = () => {
  const navi = useNavigate();
  const [loading, setLoading] = useState(false);
  const [selectCompanyId, setselectCompanyId] = useState("");
  const { getallComapny } = useSelector((state: RootState) => state.company);

  const { register, handleSubmit, reset, setValue } = useForm<Inputs>({
    defaultValues: { companyId: selectCompanyId },
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const res = await axios.post(BASE_URL + "/api/job/postjob", data, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });

      if (res.status === 201) {
        toast.success(res.data.message);
        reset();
        navi("/admin/companies/jobs");
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

  const handleCompanySelect = (companyId: string) => {
    setValue("companyId", companyId);
    setselectCompanyId(companyId);
    // console.log(companyId);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-3xl mx-auto shadow-xl p-5 mt-10 bg-white border border-gray-100">
        <h1 className="text-center font-bold mb-10 text-2xl">Create New Job</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                type="text"
                {...register("title", { required: "Title is required" })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                type="text"
                {...register("description", {
                  required: "description is required",
                })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="requirements">Requirements</Label>
              <Input
                id="requirements"
                type="text"
                {...register("requirements", {
                  required: "requirements is required",
                })}
              />
            </div>
            <div>
              <Label htmlFor="salary">Salary</Label>
              <Input
                id="salary"
                type="text"
                {...register("salary", { required: "salary is required" })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                {...register("location", { required: "location is required" })}
              />
            </div>
            <div>
              <Label htmlFor="jobType">JobType</Label>
              <Input
                id="jobType"
                type="text"
                {...register("jobType", { required: "jobType is required" })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                type="text"
                {...register("experience", {
                  required: "experience is required",
                })}
              />
            </div>
            <div>
              <Label htmlFor="position">Position</Label>
              <Input
                id="position"
                type="number"
                {...register("position", { required: "position is required" })}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {getallComapny.length > 0 && (
              <Select onValueChange={(value) => handleCompanySelect(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a Company" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {getallComapny.map((company) => (
                      <SelectItem key={company._id} value={company._id}>
                        {company.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            )}
          </div>

          <div className="flex gap-5">
            <div>
              <Button
                type="submit"
                variant={"outline"}
                className=""
                onClick={() => navi("/admin/companies/jobs")}
              >
                <ArrowBigLeft /> back
              </Button>
            </div>

            <div>
              {/* Submit Button */}
              {loading ? (
                <Button
                  disabled
                  className="bg-black hover:bg-black text-white hover:text-white "
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="bg-black hover:bg-black text-white hover:text-white ">
                  Create New Job
                </Button>
              )}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostAdminJob;
