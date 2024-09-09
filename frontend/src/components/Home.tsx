import Navbar from "@/shared/Navbar";
import HeroSection from "./HeroSection";
import CategoryCarousel from "./CategoryCarousel";
import LatestJobOp from "./LatestJobOp";
import useGetAllJobs from "./hooks/useGetAllJobs";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
interface User {
  role: string;
}

interface AuthState {
  user: User | null;
}

const Home = () => {
  useGetAllJobs();
  const navi = useNavigate();

  const { user } = useSelector((state: RootState) => state.auth as AuthState);

  useEffect(() => {
    if(user?.role=="recruiter"){
      navi("/admin/companies")
      // console.log("yes i am goint to home route")
    }
  },[]);
  return (
    <div>
      <Navbar />
      <HeroSection />
      <CategoryCarousel />
      <LatestJobOp />
    </div>
  );
};

export default Home;
