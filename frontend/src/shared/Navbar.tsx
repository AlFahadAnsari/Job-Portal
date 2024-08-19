import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {  LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;
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
            <li><Link to={"/"}>Home</Link></li>
            <li><Link to={"/jobs"}>Jobs</Link></li>
            <li><Link to={"/browesr"}>Browesr</Link></li>
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
                  <Avatar className="w-8 h-8 sm:w-10 sm:h-10">
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="w-48 sm:w-64">
                  <div className="flex gap-4 items-center">
                    <Avatar className="w-8 h-8">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h1 className="text-sm sm:text-base">Alfahad Ansari</h1>
                      <p className="text-xs sm:text-sm">
                        Lorem ipsum dolor sit amet.
                      </p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-2 sm:gap-4 items-center">
                      <User2 className="w-4 h-4 sm:w-5 sm:h-5" />
                      <Button variant="link" className="text-sm sm:text-base">
                        View Profile
                      </Button>
                    </div>

                    <div className="flex gap-2 sm:gap-4 items-center mt-2">
                      <LogOut className="w-4 h-4 sm:w-5 sm:h-5" />
                      <Button variant="link" className="text-sm sm:text-base">
                        Logout
                      </Button>
                    </div>
                  </div>
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
