import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const FilterData = [
  {
    filterType: "Location",
    options: ["Mumbai", "Thane", "Virar", "Vasai"],
  },
  {
    filterType: "Industry",
    options: ["Front-end developer", "Back-end developer", "Fullstack developer"],
  },
  {
    filterType: "Salary",
    options: ["0-40k", "42k - 1lk", "1lk-5lk"],
  },
];

const FilterCards = () => {
  return (
    <div className="w-full">
      <h1>Filter Jobs</h1>
      <hr className="mt-3" />
      {FilterData.map((data, index) => (
        <div key={index}>
          <h2 className="mt-4 font-bold">{data.filterType}</h2>
          <RadioGroup>
            {data.options.map((option, optionIndex) => (
              <div key={optionIndex} className="flex items-center space-x-3 mt-2">
                <RadioGroupItem value={option}/>
                <Label className="text-gray-500">{option}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      ))}
    </div>
  );
};

export default FilterCards;
