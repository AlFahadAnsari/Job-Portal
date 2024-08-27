import { useSelector } from "react-redux";
import JobCards from "./JobCards";
import { RootState } from "@/redux/store";


interface Job {
  _id: string;
  title: string;
  description: string;
  position: number;
  jobType: string;
  salary: string;
  company: {
    name: string;
  };
}

const LatestJobOp = () => {
  const { getAllJob } = useSelector((state: RootState) => state.job);

  return (
    <div className="max-w-7xl mx-auto">
      <h1 className=" text-2xl text-center md:text-start md:text-4xl font-bold">
        <span className="text-[#6a38c2]">Latest & Top</span> Job Opening
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-5">
        {getAllJob.length <= 0 ? (
          <span>No Job Available</span>
        ) : (
          getAllJob?.slice(0, 6).map((job: Job) => (
            <JobCards key={job._id} job={job} />
          ))
        )}
      </div>
    </div>
  );
};

export default LatestJobOp;
