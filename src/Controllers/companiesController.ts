import company from "../Models/CompanyModel";
import { NextFunction, Request, Response } from "express";

export const getComapny = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const data = await company.find();
    res.send(data);
  } catch (err: any) {
    res.send(err.message);
  }
};

export const createCompany = async (req: Request, res: Response) => {
  try {
    const data = {
      domain: req.body.domain,
      name: req.body.name,
      logoUrl: req.body.url,
    };
  } catch (err: any) {
    res.send(err.message);
  }
};
