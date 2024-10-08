import { BASE_URL } from "@/components/constant";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { setuser } from "@/redux/authSlice";
import { RootState } from "@/redux/store";
import axios from "axios";
import { LogOut, User2 } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

interface UserProfile {
  profilePhoto: string | null;
}

interface User {
  fullname: string;
  description: string;
  role: string;
  profile?: UserProfile;
}

interface AuthState {
  user: User | null;
}

const Navbar = () => {
  const navi = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const res = await axios.get(BASE_URL + "/api/user/logout", {
        withCredentials: true,
      });
      if (res.status == 200) {
        toast.success(res.data.message);
        dispatch(setuser(null));
        navi("/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const { user } = useSelector((state: RootState) => state.auth as AuthState);

  return (
    <div className="w-full bg-white shadow-sm">
      <div className="flex justify-between h-16 mx-auto max-w-7xl items-center px-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">
            <p>
              Job<span className="text-red-600">Portal</span>
            </p>
          </h1>
        </div>

        <div className="flex font-medium items-center gap-5">
          <ul className="hidden sm:flex gap-5">
            {user && user.role === "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/companies/jobs"}>Jobs</Link>
                </li>
              </>
            ) : ( 
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browsejob"}>Browes</Link>
                </li>
              </>
            )}
          </ul>
          {!user ? (
            <div className="flex gap-2 sm:gap-4">
              <Link to="/login">
                <Button
                  variant="outline"
                  className="text-sm sm:text-base px-2 sm:px-4 py-1 sm:py-2"
                >
                  Login
                </Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-[#6a38c2] hover:bg-[#5b30a6] text-white text-sm sm:text-base px-2 sm:px-4 py-1 sm:py-2">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10 ">
                    <AvatarImage
                      className="object-contain"
                      src={
                        user?.profile?.profilePhoto ||
                        "https://github.com/shadcn.png"
                      }
                      alt="User profile"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-48 sm:w-64">
                  <div className="flex gap-4 items-center">
                    <Avatar className="w-8 h-8 rounded-full ">
                      <AvatarImage
                        className="object-contain"
                        src={
                          user?.profile?.profilePhoto ||
                          "https://github.com/shadcn.png"
                        }
                        alt="User profile"
                      />
                    </Avatar>

                    <div>
                      <h1 className="text-sm sm:text-base">
                        {user.fullname || "your name"}
                      </h1>
                      <p className="text-xs sm:text-sm">
                       {user.description || "description not add"}
                      </p>
                    </div>
                  </div>
                  {user && user.role === "recruiter" ? (
                    <>
                      <div className="flex gap-2 sm:gap-4 items-center mt-2">
                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                        <Button
                          variant="link"
                          className="text-sm sm:text-base"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </div>
                    </>
                  ) : (
                    <div className="mt-4">
                      <div className="flex gap-2 sm:gap-4 items-center">
                        <User2 className="w-4 h-4 sm:w-5 sm:h-5" />
                        <Button variant="link" className="text-sm sm:text-base">
                          <Link to={"/profile/update"}> View Profile</Link>
                        </Button>
                      </div>

                      <div className="flex gap-2 sm:gap-4 items-center mt-2">
                        <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                        <Button
                          variant="link"
                          className="text-sm sm:text-base"
                          onClick={handleLogout}
                        >
                          Logout
                        </Button>
                      </div>
                    </div>
                  )}
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
