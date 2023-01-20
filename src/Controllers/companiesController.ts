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
      logoUrl: req.body.logoUrl,
      members: [{ userId: req.userr.id, role: "admin" }],
      projects: [""],
      createdBy: req.userr.name,
    };
    const comp = await company.create(data);
    // const member = { userId: req.userr.id, role: "admin" };
    // company.updateOne({ _id: comp._id }, { $push: { members: member } });
    console.log(comp);
    res.send("success");
  } catch (err: any) {
    res.send(err.message);
  }
};

export const addMembersToCompany: Controller = async (req, res, next) => {
  try {
    console.log(req.params.id);

    await company.updateOne(
      { _id: req.params.id },
      { $push: { members: req.body.users } }
    );

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

export const updateCompanyById: Controller = async (req, res, next) => {
  try {
    const id = req.params.id;
    const comp = await company.findOne({ _id: id });
    const data = {
      domain: req.body.domain || comp?.domain,
      name: req.body.name || comp?.name,
      logoUrl: req.body.logoUrl || comp?.logoUrl,
    };
    await company.findOneAndUpdate({ _id: id }, data);
    res.send("success");
  } catch (error: any) {
    res.send(error.message);
  }
};
