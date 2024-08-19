import JobCards from "./JobCards";

const RandomJobs = [1, 2, 3, 4, 5, 6, 7, 8];
const LatestJobOp = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <h1 className=" text-2xl text-center md:text-start md:text-4xl font-bold">
        <span className="text-[#6a38c2]"> Latest & Top </span> Job Opening
      </h1>

      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 mt-5">
        {RandomJobs.slice(0,6).map(()=><JobCards/>)}
      </div>

    </div>
  );
};

export default LatestJobOp;
