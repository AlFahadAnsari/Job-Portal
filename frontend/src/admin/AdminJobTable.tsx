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

interface Job {
  company: any;
  name: string;
  title: string;
  createdAt: string;
}

const AdminJobTable: React.FC = () => {
  const navi = useNavigate();
  const { getAdminJob, searchJobByText } = useSelector(
    (state: RootState) => state.job
  );
  const [filterCompany, setFilterCompany] = useState<Job[]>(getAdminJob);

  useEffect(() => {
    const filteredJobs = getAdminJob.filter((job) => {
      if (!searchJobByText) {
        return true;
      }
      return (
        job?.title?.toLowerCase().includes(searchJobByText.toLowerCase()) ||
        job?.company?.name.toLowerCase().includes(searchJobByText.toLowerCase())
      );
    });
    setFilterCompany(filteredJobs);
  }, [getAdminJob, searchJobByText]);

  return (
    <div>
      <div>
        <Table className="border my-4">
          <TableCaption>A list of recent Post job</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Company Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filterCompany.length > 0 ? (
              filterCompany.map((job: Job, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell>{job?.company?.name}</TableCell>
                    <TableCell>{job?.title}</TableCell>
                    <TableCell>{job?.createdAt.split("T")[0]}</TableCell>
                    <TableCell className="text-start">
                      <button
                        className="text-blue-600"
                        onClick={() => navi(`/admin/companies/${job?._id}`)}
                      >
                        Edit
                      </button>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={4}>No jobs found</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AdminJobTable;
