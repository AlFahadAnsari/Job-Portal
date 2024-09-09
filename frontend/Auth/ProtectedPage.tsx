import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProtectedPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/your-protected-endpoint");
        if (response.data.redirect) {
          navigate("/login"); 
        }
      } catch (error) {
        console.error("Authentication error:", error);
        navigate("/login"); 
      }
    };

    checkAuth();
  }, [navigate]);

  return 
};

export default ProtectedPage;
