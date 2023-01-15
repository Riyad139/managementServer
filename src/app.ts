import express, { Application, Request, Response, NextFunction } from "express";

import mongoose from "mongoose";
const router = require("./Route/route");
const app = express();

app.use(express.json());
app.use(router);
// app.get("/", router);

mongoose
  .connect("mongodb://localhost:27017")
  .then((ms: any) => console.log("success"));

module.exports = app;
