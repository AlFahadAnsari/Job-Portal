import { Bookmark } from "lucide-react";
import { Button } from "./ui/button";
import { Avatar, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { useNavigate } from "react-router-dom";

interface Job {
  _id:string
  title: string;
  description: string;
  position: number;
  jobType: string;
  salary: string;
  company: {
    name: string;
  };
}
interface SingleJobProps {
  job: Job;
}

const SingleJob: React.FC<SingleJobProps> = ({ job }) => {
  const navi = useNavigate();
  return (
    <div className="p-5 shadow-xl  rounded-md bg-white border border-gray-100 ">
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
          <h1>{job?.company?.name}</h1>
          <p>India</p>
        </div>
      </div>

      <div>
        <h1 className="font-bold my-3">{job?.title}</h1>
        <p>{job?.description} </p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-500 font-bold text-sm" variant={"outline"}>{job?.position} position</Badge>
        <Badge className="text-red-500 font-bold text-sm" variant={"outline"}>{job?.jobType}</Badge>
        <Badge className="text-[#6a38c2] font-bold text-sm " variant={"outline"}>{job?.salary}</Badge>
      </div>
      <div className="flex gap-5 mt-4">
        <Button
          onClick={() => navi(`/description/${job?._id}`)}
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
