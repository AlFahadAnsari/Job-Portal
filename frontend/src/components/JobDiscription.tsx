import { Badge } from "./ui/badge";

const JobDiscription = () => {
  return (
    <div className="max-w-7xl mx-auto bg-white mt-5 text-xl">
      <h1 className="font-bold">Title</h1>
      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-500 font-bold text-sm border border-slate-200">
          12 opening
        </Badge>
        <Badge className="text-red-500 font-bold text-sm border border-slate-200">
          part time
        </Badge>
        <Badge className="text-[#6a38c2] font-bold text-sm border border-slate-200 ">
          12 Lpa
        </Badge>
      </div>

      <div>
        <h1 className="text-md my-4 font-serif">Job Description</h1>
        <hr />
      </div>

      <div className="text-base mt-4">
        <h1 className="font-bold">
          Role : <span className="font-normal pl-4">Front-end developer</span>
        </h1>
        <h1 className="font-bold">
          Location : <span className="font-normal pl-4">Andheri</span>
        </h1>
        <h1 className="font-bold">
          Description :{" "}
          <span className="font-normal pl-4">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facilis,
            molestias.
          </span>
        </h1>
        <h1 className="font-bold">
          experience : <span className="font-normal pl-4">0 - 2 years</span>
        </h1>
        <h1 className="font-bold">
          salary : <span className="font-normal pl-4"> 3 Lpa</span>
        </h1>
        <h1 className="font-bold">
          Totall Applicants : <span className="font-normal pl-4">4</span>
        </h1>
        <h1 className="font-bold">
          Post date : <span className="font-normal pl-4">17-10-24</span>
        </h1>
      </div>
    </div>
  );
};

export default JobDiscription;
