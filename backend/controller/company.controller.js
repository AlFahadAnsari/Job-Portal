import { Company } from "../model/company.model.js";
import getDataUri from "../utils/CloudinaryUri.js";
import cloudinary from "../utils/cloudinary.js";

export const RegisterCompany = async (req, res) => {
  try {
    const { companyName } = req.body;

    // Check if company name is provided
    if (!companyName) {
      return res.status(400).json({
        message: "Company name is required",
      });
    }

    // Check if the company is already registered
    const findCompany = await Company.findOne({ name: companyName });
    if (findCompany) {
      return res.status(400).json({
        message: "Company already registered",
      });
    }

    // Create and save the new company
    const saveCompany = await Company.create({
      name: companyName,
      userId: req.id,
    });

    return res.status(201).json({
      message: "Company registered successfully",
      company: saveCompany,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const GetComapny = async (req, res) => {
  try {
    const userId = req.id; 
    const companies = await Company.find({ userId });
    if (!companies) {
      return res.status(404).json({
        message: "Companies not found.",
        success: false,
      });
    }
    return res.status(200).json({
      companies,
      success: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getComapnyById = async (req, res) => {
  try {
    const comapnyId = req.params.id;
    const findComanyId = await Company.findById(comapnyId);

    if (!findComanyId) {
      return res.status(404).json({
        message: "comapny not found",
      });
    }

    return res.status(200).json({
      findComanyId,
      message: "successfull",
    });
  } catch (error) {
    console.log(error);
  }
};

export const companyUpadte = async (req, res) => {
  try {
    const { name, description, location, website } = req.body;
    let logo;

    const file = req.file;
    if (file) {
      const fileUri = getDataUri(file);
      const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
      logo = cloudResponse.secure_url;
    }

    const updateData = { name, description, location, website };
    if (logo) updateData.logo = logo;

    const updatedCompany = await Company.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    );

    if (!updatedCompany) {
      return res.status(404).json({ message: "Company not found" });
    }

    return res
      .status(200)
      .json({ message: "Company update successful", updatedCompany });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};
