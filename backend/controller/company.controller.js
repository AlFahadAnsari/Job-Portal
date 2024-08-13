import { Company } from "../model/company.model.js";

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
      company: saveCompany, // Optionally return the created company
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
    const findCompany = await Company.find(userId);

    if (!findCompany) {
      return res.status(404).json({
        message: "comapny not found",
      });
    }

    return res.status(200).json({
      findCompany,
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
    const file = req.file;

    const upadateData = { name, description, location, website };

    const UpdateComapany = await Company.findByIdAndUpdate(
      req.param.id,
      upadateData,
      { new: true }
    );

    if (!UpdateComapany) {
      return res.status(404).json({
        message: "company not found",
      });
    }

    return res.status(201).json({
      message: "Comapny update successfull",
    });
  } catch (error) {
    console.log(error);
  }
};
