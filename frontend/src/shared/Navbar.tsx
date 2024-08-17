import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Cookie, LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  // const [user , setUser] = useState(true)

  const user = false
  return (
    <>
      <div className="flex justify-between h-16 mx-auto max-w-7xl items-center">
        <div>
          <h1 className="text-2xl font-bold">
            <p>
              Job<span className="text-red-600">Portal</span>
            </p>
          </h1>
        </div>

        <div className="flex font-medium items-center gap-5">
          <ul className="flex gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browser</li>
          </ul>
          {!user ? (
            <div className="flex gap-4">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to={"/signup"}>
                <Button className="bg-[#6a38c2] hover:bg-[#5b30a6] text-white">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <div>
              <Popover>
                <PopoverTrigger asChild>
                  <Avatar>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@shadcn"
                    />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex gap-5">
                    <div>
                      <Avatar>
                        <AvatarImage
                          src="https://github.com/shadcn.png"
                          alt="@shadcn"
                        />
                      </Avatar>
                    </div>
                    <div>
                      <h1>Alfahad Ansari</h1>
                      <p className="text-xs">Lorem ipsum dolor sit amet.</p>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex gap-4">
                      <User2 className="mt-2" />
                      <Button variant="link">View Profile</Button>
                    </div>

                    <div className="flex gap-4">
                      <LogOut className="mt-2" />
                      <Button variant="link">Logout</Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
