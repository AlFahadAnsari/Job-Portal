import jwt from "jsonwebtoken";

const CheckAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    
    if (!token) {
      return res.status(403).json({
        message: "Access denied, please log in again.",
        success: false,
        redirect: true, 
      });
    }


    const verify = jwt.verify(token, process.env.SECRET_KEY_TOKEN);

    if (!verify) {
      return res.status(401).json({
        message: "Invalid token.",
        success: false,
      });
    }

    req.id = verify.userId;
    next();
  } catch (error) {
    console.error("Token verification error:", error);

    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        message: "Invalid token.",
        success: false,
      });
    }

    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        message: "Token has expired.",
        success: false,
      });
    }

    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

export default CheckAuth;
