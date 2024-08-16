import loginImg from "../../assets/login.png";
import { Link } from "react-router-dom";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

const Login = () => {
  return (
    <div className="flex items-center justify-center mt-[10rem] md:mt-0 ">
      <div className="flex shadow-lg rounded-lg overflow-hidden bg-white  ">
        <div className="hidden md:block w-1/2">
          <img src={loginImg} alt="Login" className="h-full object-cover" />
        </div>
        <div className="w-full md:w-1/2 p-12 md:mt-44">
          <h2 className="text-2xl font-bold text-center text-gray-700">
            Login
          </h2>
          <form className="">
            <div className="mb-4">
              <Label className="block text-gray-700">Username</Label>
              <Input
                type="text"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your username"
              />
            </div>
            <div className="mb-6">
              <Label className="block text-gray-700">Password</Label>
              <Input
                type="password"
                className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                placeholder="Enter your password"
              />
            </div>
            <div className="flex items-center justify-between">
              <button className="w-full px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                Login
              </button>
            </div>
            <p className="mt-4 text-sm text-center text-gray-600">
              Don't have an account?{" "}
              <Link to={"/signup"} className="text-blue-500">
                Sign Up
              </Link>
            </p>

            <p className="mt-4 text-sm text-center text-gray-600">
              Back to home page
              <Link to={"/"} className="text-blue-500">
              {"  "}
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
