import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Protected = ({ children }) => {
  const { user } = useSelector((state: RootState) => state.auth);
  const navi = useNavigate();

  useEffect(() => {
    if (user === null || user.role !== "recruiter") {
      navi("/");
    }
  });
  return <div>{children}</div>;
};

export default Protected;
