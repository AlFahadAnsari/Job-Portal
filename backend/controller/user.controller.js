// import { User } from "../model/user.model.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";

// export const register = async (req, res) => {
//   try {
//     const { fullname, email, phonenumber, password, role } = req.body;

//     if (!fullname || !email || !phonenumber || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.status(400).json({
//         message: "Email already exists",
//         success: false,
//       });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     await User.create({
//       fullname,
//       email,
//       phonenumber,
//       password: hashedPassword,
//       role,
//     });

//     return res.status(201).json({
//       message: "User registered successfully",
//       success: true,
//     });
//   } catch (error) {
//     console.error("Registration error:", error);
//     return res.status(500).json({
//       message: "Internal server error",
//       success: false,
//     });
//   }
// };

// export const login = async (req, res) => {
//   try {
//     const { email, password, role } = req.body;

//     if (!email || !password || !role) {
//       return res.status(400).json({
//         message: "Something is missing",
//         success: false,
//       });
//     }

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(400).json({
//         message: "Email does not match",
//         success: false,
//       });
//     }

//     const isPasswordMatch = await bcrypt.compare(password, user.password);
//     if (!isPasswordMatch) {
//       return res.status(400).json({
//         message: "Password does not match",
//         success: false,
//       });
//     }

//     if (role !== user.role) {
//       return res.status(400).json({
//         message:"role not match"
//       })
//     }
//   } catch (error) {}
// };

// export const logout = async (req, res) => {
//   try {
//       return res.status(200).cookie("token", "", { maxAge: 0 }).json({
//           message: "Logged out successfully.",
//           success: true
//       })
//   } catch (error) {
//       console.log(error);
//   }
// }
// export const updateProfile = async (req, res) => {
//   try {
//       const { fullname, email, phoneNumber, bio, skills } = req.body;
      
//       const file = req.file;
//       // cloudinary ayega idhar
//       const fileUri = getDataUri(file);
//       const cloudResponse = await cloudinary.uploader.upload(fileUri.content);



//       let skillsArray;
//       if(skills){
//           skillsArray = skills.split(",");
//       }
//       const userId = req.id; // middleware authentication
//       let user = await User.findById(userId);

//       if (!user) {
//           return res.status(400).json({
//               message: "User not found.",
//               success: false
//           })
//       }
//       // updating data
//       if(fullname) user.fullname = fullname
//       if(email) user.email = email
//       if(phoneNumber)  user.phoneNumber = phoneNumber
//       if(bio) user.profile.bio = bio
//       if(skills) user.profile.skills = skillsArray
    
//       // resume comes later here...
//       if(cloudResponse){
//           user.profile.resume = cloudResponse.secure_url // save the cloudinary url
//           user.profile.resumeOriginalName = file.originalname // Save the original file name
//       }


//       await user.save();

//       user = {
//           _id: user._id,
//           fullname: user.fullname,
//           email: user.email,
//           phoneNumber: user.phoneNumber,
//           role: user.role,
//           profile: user.profile
//       }

//       return res.status(200).json({
//           message:"Profile updated successfully.",
//           user,
//           success:true
//       })
//   } catch (error) {
//       console.log(error);
//   }
// }


import { User } from "../model/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "cloudinary";
import getDataUri from "../utils/dataUri.js";

export const register = async (req, res) => {
  try {
    const { fullname, email, phonenumber, password, role } = req.body;

    if (!fullname || !email || !phonenumber || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists",
        success: false,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      fullname,
      email,
      phonenumber,
      password: hashedPassword,
      role,
    });

    return res.status(201).json({
      message: "User registered successfully",
      success: true,
    });
  } catch (error) {
    console.error("Registration error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res.status(400).json({
        message: "All fields are required",
        success: false,
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Email not found",
        success: false,
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Invalid password",
        success: false,
      });
    }

    if (role !== user.role) {
      return res.status(400).json({
        message: "Role mismatch",
        success: false,
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    return res.status(200).json({
      message: "Login successful",
      token,
      success: true,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("token", "", { maxAge: 0 }).json({
      message: "Logged out successfully",
      success: true,
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { fullname, email, phoneNumber, bio, skills } = req.body;
    const file = req.file;

    let skillsArray;
    if (skills) {
      skillsArray = skills.split(",");
    }

    const userId = req.id; // Middleware should attach user ID to req object
    let user = await User.findById(userId);

    if (!user) {
      return res.status(400).json({
        message: "User not found",
        success: false,
      });
    }

    if (fullname) user.fullname = fullname;
    if (email) user.email = email;
    if (phoneNumber) user.phoneNumber = phoneNumber;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;

    // if (file) {
    //   const fileUri = getDataUri(file);
    //   const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
    //   user.profile.resume = cloudResponse.secure_url;
    //   user.profile.resumeOriginalName = file.originalname;
    // }

    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
        profile: user.profile,
      },
      success: true,
    });
  } catch (error) {
    console.error("Update profile error:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};
