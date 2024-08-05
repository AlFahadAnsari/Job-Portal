import { User } from "../model/user.model.";
import bcrypt from "bcryptjs";

export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;

    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "somthing is missing",
        success: false,
      });
    }

    const passcheck = await User.findOne({ email });
    if (passcheck) {
      return res.status(400).json({
        message: "Email already exsit",
      });
    }

    const hasspass = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phonenumber,
      password: hasspass,
      role,
    });
  } catch (error) {}
};

const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res.status(400).json({
        message: "somthing is missing",
        success: false,
      });
    }

    const findEmail = await User.findOne({email})

    if(!findEmail){
        return res.status(400).json({
            message:"email not match"
        })
    }

    const findPassword = await bcrypt.compare(password , user.password)

    if(!findPassword){
        return res.status(400).json({
            message:"password not match"
        })
    }

    if(role != user.role ){
      return res.status(400).json({
        message:"role not match"
      })
    }
  } catch (error) {}
};
