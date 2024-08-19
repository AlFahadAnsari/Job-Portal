import Navbar from "@/shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobOp from "./LatestJobOp";

const Home = () => {
  return <div>

    <Navbar/>
    <HeroSection/>
    <CategoryCarousel/>
    <LatestJobOp/>
  </div>;
};

export default Home;
