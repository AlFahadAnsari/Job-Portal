import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";

import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

interface Company {
  logo: string;
  name: string;
  date: string;
  _id: string;
  createdAt:string
}

const CompaniesTable: React.FC = () => {
  const navi = useNavigate();
  const { getallComapny  , searchComapny} = useSelector((state: RootState) => state.company);
  const [filterCompany, setFilterCompany] = useState(getallComapny);

  useEffect(()=>{
    const getfilterBySearch = filterCompany.length >= 0 && getallComapny.filter((company)=>{
      if(!searchComapny){
        return true
      }
      return company?.name?.toLowerCase().includes(searchComapny.toLowerCase())
    })
    setFilterCompany(getfilterBySearch)
  },[getallComapny , searchComapny])

  return (
    <div>
      <div>
        <Table className="border my-4">
          <TableCaption>A list of your applied job</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Logo</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {getallComapny.length === 0 ? (
              <span className="">No company registered yet</span>
            ) : (
              filterCompany.map((company: Company, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>
                      {company?.logo ? (
                        <img
                          src={company.logo}
                          alt="Company Logo"
                          className="w-12"
                        />
                      ) : (
                        <div className="w-12  flex items-center justify-center">
                          {index + 1}{" "}
                        </div>
                      )}
                    </TableCell>
                    <TableCell>{company?.name}</TableCell>
                    <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-start">
                      <button
                        className="text-blue-600"
                        onClick={() => navi(`/admin/companies/${company?._id}`)}
                      >
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default CompaniesTable;
