import Navbar from "@/shared/Navbar";
import SingleJob from "./SingleJob";

const browseJobs = [1, 2,];
const BrowseJobs = () => {
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto mt-6">
        <h1 className="font-bold text-md">
          Search Result ({browseJobs.length}){" "}
        </h1>

        <div  className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-5 mt-10">
          {browseJobs.map(() => (
            <div className="">
              <SingleJob/>
            </div>
          ) )}
        </div>
      </div>
    </>
  );
};

export default BrowseJobs;
