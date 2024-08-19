import { Search } from "lucide-react";
import { Button } from "./ui/button";

const HeroSection = () => {
  return (
    <div className="text-center mt-4">
      <div className="flex flex-col gap-5">
        <span className="text-xs md:text-sm text-red-600 bg-gray-100  rounded-full mx-auto px-2 py-2">
          No 1. Job Hut Website
        </span>
        <h1 className="text-3xl md:text-5xl font-bold">
          {" "}
          Search, Apply & <br /> Get Your{" "}
          <span className="text-[#6a38c2]">Dream Job</span>
        </h1>
        <p className=" text-xs md:text-sm ">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Labore
          quaerat beatae aspernatur voluptas rerum?
        </p>
        <div className="flex justify-center items-center">
          <input
            className=" w-[55%] md:w-[40%] rounded-full outline-none border-none shadow-md p-2"
            type="text"
            placeholder="find Your Dream Job"
          />
          <Button className="bg-[#6a38c2] rounded-full hover:bg-[#6a38c2]">
            <Search className=" text-white h-3 md:h-5 w-3 md:w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
