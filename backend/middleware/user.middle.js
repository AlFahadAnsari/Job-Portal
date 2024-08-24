import jwt from "jsonwebtoken";

const CheckAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "User not authenticated.",
        success: false,
      });
    }

    const verify = await jwt.verify(token, process.env.SECRET_KEY);
    if (!verify) {
      return res.status(401).json({
        message: "Invalid token.",
        success: false,
      });
    }

    req.id = verify.userId;
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Server error.",
      success: false,
    });
  }
};

export default CheckAuth;
