import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/shared/Navbar";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import AdminJobTable from "./AdminJobTable";
import useGetAdminJob from "@/components/hooks/useGetAdminJob";
import { setsearchJobByText } from "@/redux/jobSlice";

const AdminJob = () => {
  useGetAdminJob();
  const [searchtext, setSearchtext] = useState("");
  const navi = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setsearchJobByText(searchtext));
  }, [searchtext]);
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between  my-10">
          <Input
            className="w-fit "
            placeholder="Search By Name"
            onChange={(e) => setSearchtext(e.target.value)}
          ></Input>
          <Button
            className="bg-black text-white hover:bg-black hover:text-white"
            onClick={() => navi("/admin/jobs/create")}
          >
            Add New Job
          </Button>
        </div>

        <AdminJobTable />
      </div>
    </div>
  );
};

export default AdminJob;
