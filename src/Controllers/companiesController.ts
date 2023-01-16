import company, { iCompany, Imember } from "../Models/CompanyModel";

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
      members: [{ userId: req.userr.id, role: "admin" }],
      projects: [""],
      createdBy: req.userr.name,
    };
    await company.create(data);

    res.send("success");
  } catch (err: any) {
    res.send(err.message);
  }
};

export const addMembersToCompany: Controller = async (req, res, next) => {
  try {
    console.log(req.params.id);
    const [comp] = await company.find({ _id: req.params.id });
    const user = comp.members;

    req.body.users?.forEach((it: Imember) => user?.push(it));
    console.log(user);

    await company.findByIdAndUpdate({ _id: req.params.id }, { members: user });

    res.send("success");
    //company.findByIdAndUpdate({ _id: req.params.id });
  } catch (error: any) {
    res.send(error.message);
  }
};

export const deleteCompanyById: Controller = async (req, res, next) => {
  try {
    await company.deleteOne({ _id: req.params.id });
    res.send("success");
  } catch (error: any) {
    res.send(error.message);
  }
};
