import Navbar from "@/shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import AppliedJobs from "./AppliedJobsTable";
import { useState } from "react";
import EditProfile from "./EditProfile";
import { useSelector } from "react-redux";
import useGetAppliedJob from "./hooks/useGetAppliedJob";

// const Skils = ["Html", "Css", "Javascript", "ReactJs"];
const resume = true;

const Profile = () => {
  const [open, setOpen] = useState<boolean>(false);
  const { user } = useSelector((store) => store.auth);

  useGetAppliedJob();
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="max-w-7xl mx-auto bg-white mt-5 shadow-md rounded-md border border-gray-100">
        <div className="flex justify-between gap-4">
          <div className="flex">
            <Avatar className="">
              <AvatarImage
                src="https://imgs.search.brave.com/T8RKl2faVEEhKfTtBKdvigh00GkSIBVACA_wl1M_MgU/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly90NC5m/dGNkbi5uZXQvanBn/LzA4LzMyLzUwLzk1/LzM2MF9GXzgzMjUw/OTUzNV9mSk5GckdL/UHF5azg1a2tqZ2Uy/MlJiTTJUTWFjUjln/Vy5qcGc"
                className="h-24 w-24"
              />
            </Avatar>
            <div className="mt-5">
              <h1 className="font-bold">
                {user?.fullname ? user?.fullname : "your name"}
              </h1>
              <p>
                {user?.profile?.bio ? user.profile.bio : <span>Add Bio</span>}
              </p>
            </div>
          </div>

          <Button
            variant={"outline"}
            size={"icon"}
            onClick={() => setOpen(true)}
          >
            <Pen />
          </Button>
        </div>

        {/* deatils  */}
        <div className="pl-10 flex flex-col gap-3 ">
          <div className=" flex gap-4">
            <Mail />
            <p>{user?.email}</p>
          </div>
          <div className=" flex gap-4">
            <Contact />
            <p>{user?.phoneNumber}</p>
          </div>

          {/* skilss */}
          <div className="mt-3">
            <p className="mb-2">Skills</p>
            <div className="flex gap-4">
              {user?.profile?.skills.length == 0 ? (
                <span className="font-bold">Na</span>
              ) : (
                user?.profile?.skills.map((i: any, index: number) => {
                  return (
                    <Badge
                      key={index}
                      className="bg-black rounded-2xl py-1 hover:bg-black hover:text-white text-white"
                    >
                      {i}
                    </Badge>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/*  resume  */}

        <div className="pl-10 mt-7 mb-5">
          <h1 className="font-bold">Resume</h1>
          {resume ? (
            <a
              href="github.com/alfahadansari"
              target="blank"
              className="text-blue-500 hover:border-b-2 hover:border-b-blue-300"
            >
              Alfahad Ansari{" "}
            </a>
          ) : (
            <span>Not Upload</span>
          )}
        </div>
      </div>

      {/*  apply jobs */}

      <div className="max-w-7xl mx-auto">
        <h1 className="font-bold mt-5 p-5">Applied Jobs</h1>

        <div>
          <AppliedJobs />
        </div>
        <EditProfile open={open} setOpen={setOpen} />
      </div>
    </div>
  );
};

export default Profile;
