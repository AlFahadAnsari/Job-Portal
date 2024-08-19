import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";

const FilterData = [
  {
    filterType: "Location",
    array: ["mumbai", "thane", "virar", "vasai"],
  },
  {
    filterType: "Industry",
    array: ["Front-end developer", "Back-end developer", "Fullstack developer"],
  },
  {
    filterType: "Salary",
    array: ["0-40k", "42k - 1lk", "1lak-5lak"],
  },
];

const FilterCards = () => {
  return (
    <div>
      <h1>Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup>
        {FilterData.map((data, index) => (
          <div key={index}>
            <h1>{data.filterType}</h1>
            {data.array.map((option, optionIndex) => {
              return (
                <div key={optionIndex}>
                  <RadioGroupItem value={option}>
                    <Label className="p-10">{option}</Label>
                  </RadioGroupItem>
                </div>
              );
            })}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCards;
