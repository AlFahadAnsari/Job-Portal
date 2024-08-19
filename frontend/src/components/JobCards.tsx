import { Badge } from "./ui/badge";

const JobCards = () => {
  return (
    <div className="p-5 rounded-md shadow-xl m-4 cursor-pointer">
      <div>
        <h1 className="font-bold ">Company Name</h1>
        <p className="text-slate-500">india</p>
      </div>

      <div>
        <h1 className="font-bold">Job Tiltle</h1>
        <p className="text-slate-500">Lorem ipsum dolor sit amet consectetur, adipisicing elit.</p>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <Badge className="text-blue-500 font-bold text-sm">12 opening</Badge>
        <Badge className="text-red-500 font-bold text-sm">part time</Badge>
        <Badge className="text-[#6a38c2] font-bold text-sm ">12 Lpa</Badge>
      </div>
    </div>
  );
};

export default JobCards;
