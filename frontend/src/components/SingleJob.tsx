import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

const SingleJob = () => {
  const navi = useNavigate();
  const JobId = "lkjhsgfsx";
  return (
    <div className="p-5 shadow-xl  rounded-md bg-white border border-gray-100 hover:scale-95 transition-all ">
      <div className="flex justify-between">
        <p>2 days ago </p>
        <Button className="" variant={"outline"} size={"icon"}>
          <Bookmark />
        </Button>
      </div>

      <div className="flex items-center gap-2 my-2">
        <Button className="p-6" variant={"outline"} size={"icon"}>
          <Avatar>
            <AvatarImage src="https://imgs.search.brave.com/fmtLWMPcpM2L8uVgu2G7u_LI59QcdRE39arjGiYSAIc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvMTE4/OTA5ODU5Ni92ZWN0/b3IvYWJzdHJhY3Qt/dHJpYW5nbGUtc2hh/cGUtbG9nby1zaWdu/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1tdnRyX3dqX3lv/TUJZdEVveFZRd0kx/RlR5MU9TQ3JWYVVR/UmQ2cnlNSTI0PQ"></AvatarImage>
          </Avatar>
        </Button>
        <div>
          <h1>Company name</h1>
          <p>India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold my-3">Title</h1>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, a. </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-500 font-bold text-sm">12 opening</Badge>
        <Badge className="text-red-500 font-bold text-sm">part time</Badge>
        <Badge className="text-[#6a38c2] font-bold text-sm ">12 Lpa</Badge>
      </div>
      <div className="flex gap-5 mt-4">
        <Button
          onClick={() => navi(`/description/${JobId}`)}
          variant={"outline"}
        >
          Details
        </Button>
        <Button className="bg-[#6a38c2] hover:bg-[#45267b]  text-white">
          Save for latter
        </Button>
      </div>
    </div>
  );
};

export default SingleJob;
