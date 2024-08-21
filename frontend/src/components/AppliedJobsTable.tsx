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

const data = [1, 2, 3];

const AppliedJobs = () => {
  return (
    <div>
      <Table className="border my-4">
        <TableCaption>A list of your applied job</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role </TableHead>
            <TableHead>Company </TableHead>
            <TableHead className="text-center">Status </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((index) => {
            return (
              <TableRow key={index}>
                <TableCell>20-08-24</TableCell>
                <TableCell>Front-end Developer</TableCell>
                <TableCell>Google</TableCell>
                <TableCell className="text-center">
                  <Badge className="bg-black rounded-2xl py-1 hover:bg-black hover:text-white text-white ">
                    selected
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobs;
