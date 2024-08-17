import signupImg from "../../assets/signup.png";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../constant";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";

type Inputs = {
  fullname: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string; // Now correctly typed as a string
  file: FileList;
};

const Signup = () => {
  const navi =useNavigate()
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const formData = new FormData();

    formData.append("fullname", data.fullname);
    formData.append("email", data.email);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("role", data.role);

    if (data.file.length > 0) {
      formData.append("file", data.file[0]);
    }
    try {
      const res = await axios.post(BASE_URL + "/api/user/register", formData);
      if (res.status == 201) {
        toast.success("register successfull");
        reset();
        setLoading(false);
        navi("/login")
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
    // handle file upload and form data submission here
  };

  return (
    <div className="flex items-center justify-center mt-[3rem] md:mt-10">
      <div className="flex shadow-lg md:shadow-none rounded-lg overflow-hidden bg-white sm:w-full">
        <div className="hidden md:block w-1/2">
          <img src={signupImg} alt="Signup" className="h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-12">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Sign Up
          </h2>
          <form className="mt-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label className="block text-gray-700">Full Name</Label>
              <Input
                {...register("fullname", { required: true })}
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your full name"
              />
              {errors.fullname && (
                <span className="text-red-500">Full Name is required</span>
              )}
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700">Email</Label>
              <Input
                {...register("email", { required: true })}
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
              />
              {errors.email && (
                <span className="text-red-500">Email is required</span>
              )}
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700">Phone Number</Label>
              <Input
                {...register("phoneNumber", { required: true })}
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your phone number"
              />
              {errors.phoneNumber && (
                <span className="text-red-500">Phone number is required</span>
              )}
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700">Password</Label>
              <Input
                {...register("password", { required: true })}
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500">Password is required</span>
              )}
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700">File</Label>
              <Input
                {...register("file")}
                minLength={10}
                maxLength={10}
                type="file"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <Label className="block text-gray-700">Account Type</Label>
              <div className="flex items-center mt-2">
                <input
                  {...register("role", { required: true })}
                  type="radio"
                  id="student"
                  value="student"
                  className="mr-2"
                />
                <Label htmlFor="student" className="mr-4">
                  Student
                </Label>
                <input
                  {...register("role", { required: true })}
                  type="radio"
                  id="recruiter"
                  value="recruiter"
                  className="mr-2"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
              {errors.role && (
                <span className="text-red-500">Role is required</span>
              )}
            </div>
            {loading ? (
              <Button
                disabled
                className="rounded-full w-full bg-blue-500 hover:bg-blue-700"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full rounded-full self-center bg-blue-500 hover:bg-blue-700">
                Login
              </Button>
            )}
            <p className="mt-4 text-sm text-center text-gray-600">
              Already have an account?{" "}
              <Link to={"/login"} className="text-blue-500">
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
