import express, { Application, Request, Response, NextFunction } from "express";

import mongoose from "mongoose";
const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});

mongoose
  .connect("mongodb://localhost:27017")
  .then((ms: any) => console.log("success"));

module.exports = app;
