import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../model/user.model.js";
// import getDataUri from "../utils/datauri.js";
// import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }

    // const file = req.file;
    // const fileUri = getDataUri(file);
    // const cloudResponse = await cloudinary.uploader.upload(fileUri.content);

    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({
        message: "User already exist with this email.",
        success: false,
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserCreate = await User.create({
      fullname,
      email,
      phoneNumber,
      password: hashedPassword,
      role,
      // profile: {
      //   profilePhoto: cloudResponse.secure_url,
      // },
    });

    return res.status(201).json({
      message: "Account created successfully.",
      // newUserCreate,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "Something is missing",
        success: false,
      });
    }
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Incorrect email or password.",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Account doesn't exist with current role.",
        success: false,
      });
    }

    const tokenData = {
      userId: user._id,
    };

    const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
      expiresIn: "1d",
    });

    user = {
      _id: user._id,
      fullname: user.fullname,
      email: user.email,
      phoneNumber: user.phoneNumber,
      role: user.role,
      profile: user.profile,
    };

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpsOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${user.fullname}`,
        user,
        success: true,
      });
  } catch (error) {
    console.log(error);
  }
};

export const logout = async (req, res) => {
  try {
    res.status(200).cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully.",
      success: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "An error occurred during logout.",
      success: false,
    });
  }
};

export const UpdateProfile = async (req, res) => {
  try {
    const { fullname, email, phonenumber, bio, skills } = req.body;

    let skillArrey;
    if (skills) {
      skillArrey = skills.split(",");
    }
    const userId = req.id;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "user not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phonenumber) user.phonenumber = phonenumber;
    if (bio) user.bio = bio;
    if (skills) user.skills = skills;

    // (user.fullname = fullname),
    //   (user.email = email),
    //   (user.phonenumber = phonenumber),
    //   (user.bio = bio),
    //   (user.skills = skills);

    await user.save();

    const updatedUser = {
      id: user._id,
      fullname: user.fullname,
      email: user.email,
      role: user.role,
      phonenumber: user.phonenumber,
      profile: user.profile,
      skills: user.skills, // Include the skills in the response if needed
    };

    return res.status(200).json({
      message: "update successful",
      user: updatedUser,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "An error occurred while updating the profile",
      success: false,
    });
  }
};
