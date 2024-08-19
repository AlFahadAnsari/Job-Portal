import Navbar from "@/shared/Navbar";
import FilterCards from "./FilterCards";
import SingleJob from "./SingleJob";

const jobsArray = [1, 2, 3, 4, 5, 6, 7, 8];
const Job = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto mt-5">
        <div className="flex gap-5">
          <div className="w-20%">
            <FilterCards />
          </div>
          {jobsArray.length <= 0 ? (
            <span>No Job Found</span>
          ) : (
            <div className="flex-1 h-[88vh] overflow-y-auto pb-5">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-4 ">
                {jobsArray.map(() => (
                  <SingleJob />
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
