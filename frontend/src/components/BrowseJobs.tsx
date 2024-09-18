import Navbar from "@/shared/Navbar";
import SingleJob from "./SingleJob";
import useGetAllJobs from "./hooks/useGetAllJobs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { setSearchHome } from "@/redux/jobSlice";

const BrowseJobs = () => {
  useGetAllJobs();
  const { getAllJob } = useSelector((state: RootState) => state.job);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(setSearchHome(""));
    };
  });
  return (
    <>
      <div>
        <Navbar />
      </div>
      <div className="max-w-7xl mx-auto mt-6">
        <h1 className="font-bold text-md">
          Search Result ({getAllJob.length}){" "}
        </h1>

        <div className="grid lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-1 gap-5 mt-10">
          {getAllJob.map((job) => (
            <div className="">
              <SingleJob key={job._id}  job={job}/>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default BrowseJobs;
