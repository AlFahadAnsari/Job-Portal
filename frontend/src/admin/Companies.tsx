import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/shared/Navbar";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import useGetAllComapny from "@/components/hooks/useGetAllComapny";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setSearchCompany } from "@/redux/companySlice";

const Companies = () => {
  useGetAllComapny();
  const [searchtext, setSearchtext] = useState("");
  // console.log(searchtext)
  const navi = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchCompany(searchtext));
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
            onClick={() => navi("/admin/companies/create")}
          >
            Add Company
          </Button>
        </div>

        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
