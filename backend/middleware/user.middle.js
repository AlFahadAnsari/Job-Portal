import jwt from "jsonwebtoken";

 const CheckAuth = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      return res.status(401).json({
        message: "user not aut",
        success: false,
      });
    }

    const verify = await jwt.verify(token, process.env.SECRET_KEY);
    if (!verify) {
      return res.status(401).json({
        message: "invalid user",
        success: false,
      });
    }

    req.id=verify.id
    next()
  } catch (error) {}
};


export default CheckAuth