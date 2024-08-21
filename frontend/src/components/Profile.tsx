import Navbar from "@/shared/Navbar";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import { Contact, Mail, Pen } from "lucide-react";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import AppliedJobs from "./AppliedJobsTable";
import { useState } from "react";
import EditProfile from "./EditProfile";

const Skils = ["Html", "Css", "Javascript", "ReactJs"];
const resume = true;

const Profile = () => {
  const [open, setOpen] = useState(false);

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
              <h1 className="font-bold">Full Name</h1>
              <p>
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Labore, architecto.
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
            <p>afahadansari@gmail.com</p>
          </div>
          <div className=" flex gap-4">
            <Contact />
            <p>7506022336</p>
          </div>

          {/* skilss */}
          <div className="mt-3">
            <p className="mb-2">Skills</p>
            <div className="flex gap-4">
              {Skils.length === 0 ? (
                <span className="font-bold">Na</span>
              ) : (
                Skils.map((i) => {
                  return (
                    <Badge className="bg-black rounded-2xl py-1 hover:bg-black hover:text-white text-white ">
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
        <h1 className="font-bold mt-5">Applied Jobs</h1>

        <div>
          <AppliedJobs />
        </div>

        <div>{open == true ? <EditProfile /> : ""}</div>
      </div>
    </div>
  );
};

export default Profile;
