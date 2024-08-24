import { Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useForm, SubmitHandler } from "react-hook-form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import toast from "react-hot-toast";
import { BASE_URL } from "./constant";

interface EditProfileProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

type Inputs = {
  fullname: string;
  email: string;
  phonenumber: number | string;
  bio: string;
  skills: string;
  resume: FileList;
};

const EditProfile: React.FC<EditProfileProps> = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setValue("fullname", user?.fullname || "");
    setValue("email", user?.email || "");
    setValue("phonenumber", user?.phoneNumber || "");
    setValue("bio", user?.bio || "");
    setValue("skills", user?.profile?.skills.join(", ") || "");
    setValue("resume", user?.file || "");
  }, [user, setValue]);

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    try {
      const payload = {
        fullname: data.fullname || user.fullname,
        email: data.email || user.email,
        phonenumber: data.phonenumber || user.phoneNumber,
        bio: data.bio || user.bio,
        skills: data.skills || user.profile.skills,
        resume: data.resume[0] || user.file,
      };
      const res = await axios.post(
        BASE_URL + "/api/user/profile/update",
        payload
      );
      if (res.status === 200) {
        toast.success(res.data.message);
        setOpen(true);
      }
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="m-10 md:m-0">
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row md:items-center ">
              <Label className="md:w-1/5 mb-2 md:mb-0">Name</Label>
              <Input
                type="text"
                {...register("fullname")}
                className="w-full md:w-3/4"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center ">
              <Label className="md:w-1/5 mb-2 md:mb-0">Email</Label>
              <Input
                type="email"
                {...register("email")}
                className="w-full md:w-3/4"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center ">
              <Label className="md:w-1/5 mb-2 md:mb-0">Number</Label>
              <Input
                type="number"
                {...register("phonenumber")}
                className="w-full md:w-3/4"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center ">
              <Label className="md:w-1/5 mb-2 md:mb-0">Bio</Label>
              <Input
                type="text"
                {...register("bio")}
                className="w-full md:w-3/4"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center ">
              <Label className="md:w-1/5 mb-2 md:mb-0">Skills</Label>
              <Input
                type="text"
                {...register("skills")}
                className="w-full md:w-3/4"
              />
            </div>
            <div className="flex flex-col md:flex-row md:items-center ">
              <Label className="md:w-1/5 mb-2 md:mb-0">Resume</Label>
              <Input
                type="file"
                {...register("resume")}
                className="w-full md:w-3/4"
              />
            </div>

            {loading ? (
              <Button
                disabled
                className="rounded-full w-full bg-blue-600 hover:bg-blue-500"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button className="w-full rounded-full self-center bg-blue-600 hover:bg-blue-500 text-white ">
                Update
              </Button>
            )}
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditProfile;
