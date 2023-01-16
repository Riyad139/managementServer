import company from "../Models/CompanyModel";

export const getComapny: Controller = async (req, res, next) => {
  try {
    const data = await company.find();
    res.send(data);
  } catch (err: any) {
    res.send(err.message);
  }
};

export const getComapnyById: Controller = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await company.find({ _id: id });
    res.send(data);
  } catch (err: any) {
    res.send(err.message);
  }
};

export const createCompany: Controller = async (req, res, next) => {
  try {
    const data = {
      domain: req.body.domain,
      name: req.body.name,
      logoUrl: req.body.url,
      members: [{ userId: req.userr.id, roles: "admin" }],
      projects: [""],
      createdBy: req.userr.name,
    };
    company.create(data);
    res.send("success");
  } catch (err: any) {
    res.send(err.message);
  }
};
