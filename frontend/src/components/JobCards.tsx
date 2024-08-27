import { Badge } from "./ui/badge";

// Define the Job type
interface Job {
  title: string;
  description: string;
  position: number;
  jobType: string;
  salary: string;
  company: {
    name: string;
  };
}

interface JobCardsProps {
  job: Job;
}

const JobCards: React.FC<JobCardsProps> = ({ job }) => {
  return (
    <div className="p-5 rounded-md shadow-xl m-4 cursor-pointer bg-white border-2 border-gray-100 ">
      <div>
        <h1 className="font-medium text-lg">{job?.company?.name}</h1>
        <p className="text-sm text-gray-500">India</p>
      </div>
      <div>
        <h1 className="font-bold text-lg my-2">{job?.title}</h1>
        <p className="text-sm text-gray-600">{job?.description}</p>
      </div>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-700 font-bold" variant="outline">
          {job?.position} Positions
        </Badge>
        <Badge className="text-[#F83002] font-bold" variant="outline">
          {job?.jobType}
        </Badge>
        <Badge className="text-[#7209b7] font-bold" variant="outline">
          {job?.salary} LPA
        </Badge>
      </div>
    </div>
  );
};

export default JobCards;
