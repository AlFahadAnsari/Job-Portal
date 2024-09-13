import Navbar from "@/shared/Navbar";
import FilterCards from "./FilterCards";
import SingleJob from "./SingleJob";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

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

const Job = () => {
  const { getAllJob } = useSelector((state: RootState) => state.job);

  return (
    <div className="p-7">
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCards />
          </div>
          {getAllJob.length <= 0 ? (
            <span>No Job Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4">
                {getAllJob.map((job: Job) => (
                  <SingleJob key={job._id} job={job} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Job;
