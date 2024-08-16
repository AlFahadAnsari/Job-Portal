import signupImg from "../../assets/signup.png";
import { Link } from "react-router-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { useForm, SubmitHandler } from "react-hook-form";

type Inputs = {
  fullname: string;
  email: string;
  phonenumber: string;
  password: string;
  role: {
    student: string;
    recruiter: string;
  };
  file: FileList;
};

const Signup = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="flex items-center justify-center mt-[3rem] md:mt-0 ">
      <div className="flex shadow-lg rounded-lg overflow-hidden bg-white  sm:w-full">
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
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700">Email</Label>
              <Input
                {...register("email", { required: true })}
                type="email"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700">Password</Label>
              <Input
                {...register("password", { required: true })}
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="mb-4">
              <Label className="block text-gray-700">File</Label>
              <Input
                {...register("file")}
                type="file"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <div className="mb-6">
              <Label className="block text-gray-700">Account Type</Label>
              <div className="flex items-center mt-2">
                <input
                  {...register("student", { required: true })}
                  type="radio"
                  id="student"
                  name="accountType"
                  className="mr-2"
                />
                <Label htmlFor="student" className="mr-4">
                  Student
                </Label>
                <input
                  {...register("student", { required: true })}
                  type="radio"
                  id="recruiter"
                  name="accountType"
                  className="mr-2"
                />
                <Label htmlFor="recruiter">Recruiter</Label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Sign Up
              </button>
            </div>
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
