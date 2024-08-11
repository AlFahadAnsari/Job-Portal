import { Company } from "../model/company.model";

export const RegisterCompany = async (req, res) => {
  try {
    const { companyName } = req.body;
    if (!companyName) {
      return res.status(400).json({
        message: "company name is require",
      });
    }

    const findCompany = await Company.findOne({ name: companyName });
    if (!findCompany) {
      return res.status(400).json({
        message: "comapny already register",
      });
    }

    const saveComapny = await Company.create({
      name: companyName,
      userId: req.id,
    });
  } catch (error) {
    console.log(error);
  }
};

export const GetComapny = async (req, res) => {};
