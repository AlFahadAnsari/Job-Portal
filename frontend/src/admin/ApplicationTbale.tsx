import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../components/ui/table";
import { MoreHorizontal } from "lucide-react";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";
import { BASE_URL } from "@/components/constant";

const ApplicationTable = () => {
  const { applicants } = useSelector((state: RootState) => state.applicant);

  const approval = ["Accepted", "Rejected"];

  const hanldeStatus = async (status:any, id:any) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        BASE_URL + `/api/application/status/${id}/update`,
        { status }
      );

      if(res.status===200){
        toast.success(res.data.message)
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.error(error.response.data.message || "An error occurred");
      } else {
        toast.error("An error occurred");
      }
    }
  };

  return (
    <div>
      <Table className="border my-4">
        <TableCaption>A list of recent Job Applicants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Full Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Action</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {applicants?.application?.map((app, index) => (
            <TableRow key={index}>
              <TableCell>{app?.applicant?.fullname || "N/A"}</TableCell>
              <TableCell>{app?.applicant?.email || "N/A"}</TableCell>
              <TableCell>{app?.applicant?.phoneNumber || "N/A"}</TableCell>
              <TableCell>
                {app?.applicant?.profile?.profilePhoto ? (
                  <a
                    href={app?.applicant?.profile?.profilePhoto}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700"
                  >
                    View Resume
                  </a>
                ) : (
                  "N/A"
                )}
              </TableCell>
              <TableCell>
                {new Date(app?.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell className="cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {approval.map((status, index) => (
                      <div key={index} onClick={()=> hanldeStatus(status,app?._id)}>
                        <span>{status}</span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicationTable;
