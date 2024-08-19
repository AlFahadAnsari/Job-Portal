import { Button } from "./ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";

const CategoryCarousel = () => {
  const Category = [
    "Front-end developer",
    "Back-end developer",
    "Graphic Designer",
    "Full stack developer",
  ];

  return (
    <div>
      <Carousel className="w-full max-w-2xl mx-auto my-14 px-4">
        <CarouselContent className="flex space-x-4">
          {Category.map((item) => (
            <CarouselItem
              key={item}
              className="basis-full sm:basis-1/2 md:basis-1/3 flex justify-center"
            >
              <Button
                variant="outline"
                className="min-w-fit sm:w-auto bg-[#6a38c2] text-white rounded-full"
              >
                {item}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="absolute left-10 md:left-[-60px] top-1/2 transform -translate-y-1/2" />
        <CarouselNext className="absolute right-10 md:right-[-60px] top-1/2 transform -translate-y-1/2" />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
