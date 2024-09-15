import { useSelector } from "react-redux";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { RootState } from "@/redux/store";

interface Job {
  title: string;
  company: {
    name: string;
  };
}

interface AppliedJob {
  createdAt: string;
  job: Job;
  status: "accepted" | "rejected" | "pending" | "unknown"; // Extend as needed
}

interface JobState {
  getaAppliedJob: AppliedJob[];
}

const AppliedJobs = () => {
  const { getaAppliedJob } = useSelector(
    (state: RootState) => state.job as JobState
  );

  const appliedJobs: AppliedJob[] = Array.isArray(getaAppliedJob)
    ? getaAppliedJob
    : [];

  const getStatusColor = (
    status: "accepted" | "rejected" | "pending" | "unknown"
  ) => {
    switch (status) {
      case "accepted":
        return "bg-green-500 text-white"; 
      case "rejected":
        return "bg-red-500 text-white"; 
      case "pending":
        return "bg-orange-500 text-white"; 
      default:
        return "bg-gray-500 text-white";
    }
  };

  return (
    <div className="px-5">
      <Table className="border my-4">
        <TableCaption>A list of your applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {appliedJobs.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                You have not applied yet
              </TableCell>
            </TableRow>
          ) : (
            appliedJobs.map((item, index) => (
              <TableRow key={index}>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{item.job.title || "N/A"}</TableCell>
                <TableCell>{item.job.company.name || "N/A"}</TableCell>
                <TableCell className="text-center">
                  <Badge
                    className={`rounded-2xl py-1 ${getStatusColor(
                      item.status
                    )}`}
                  >
                    {item.status || "N/A"}
                  </Badge>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
