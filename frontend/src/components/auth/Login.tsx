import loginImg from "../../assets/login.png";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "../constant";
import toast from "react-hot-toast";
import { useState } from "react";
import { Button } from "../ui/button";
import { Cookie, Loader2 } from "lucide-react";
import { useDispatch } from "react-redux";
import { setuser } from "@/redux/authSlice";

type Inputs = {
  gmail: string;
  password: string;
  role: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navi = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const paylaod = {
        email: data.gmail,
        password: data.password,
        role: data.role,
      };
      const res = await axios.post(BASE_URL + "/api/user/login", paylaod);
      if (res.status === 200) {
        toast.success(res.data.message);
        reset();
        navi("/");
        dispatch(setuser(res.data.user));
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center mt-[6rem] md:mt-0">
      <div className="flex shadow-lg rounded-lg overflow-hidden bg-white">
        <div className="hidden md:block w-1/2 lg:mt-2 md:mt-52">
          <img src={loginImg} alt="Login" className="object-contain" />
        </div>
        <div className="w-full md:w-1/2 p-12 md:mt-44">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Login
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <Label className="block text-gray-700">Gmail</Label>
              <Input
                {...register("gmail", { required: "Gmail is required" })}
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your Gmail"
              />
              {errors.gmail && (
                <span className="text-red-500">{errors.gmail.message}</span>
              )}
            </div>
            <div className="mb-6">
              <Label className="block text-gray-700">Password</Label>
              <Input
                {...register("password", { required: "Password is required" })}
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your password"
              />
              {errors.password && (
                <span className="text-red-500">{errors.password.message}</span>
              )}
            </div>
            <div className="mb-6">
              <Label className="block text-gray-700">Account Type</Label>
              <div className="flex items-center mt-2">
                <input
                  {...register("role", { required: "Role is required" })}
                  type="radio"
                  id="student"
                  value="student"
                  className="mr-2"
                />
                <Label htmlFor="student" className="mr-4">
                  Student
                </Label>
                <input
                  {...register("role", { required: "Role is required" })}
                  type="radio"
                  id="recruiter"
                  value="recruiter"
                  className="mr-2"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
              {errors.role && (
                <span className="text-red-500">{errors.role.message}</span>
              )}
            </div>
            <div className="flex items-center justify-between">
              {loading ? (
                <Button
                  disabled
                  className="rounded-full w-full bg-blue-600 hover:bg-blue-500"
                >
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Please wait
                </Button>
              ) : (
                <Button className="w-full rounded-full self-center bg-blue-600 hover:bg-blue-500  text-white">
                  Login
                </Button>
              )}
            </div>
            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-blue-500">
                Sign Up
              </Link>
            </p>
            <p className="mt-4 text-sm text-center text-gray-600">
              Back to home page{" "}
              <Link to={"/"} className="text-blue-500">
                Home
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
