import express, { Application, Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import mongoose from "mongoose";
import addUserToReq from "./middleware/addUserToReq";
import router from "./Route/route";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(addUserToReq);
app.use(router);
// app.get("/", router);

mongoose
  .connect("mongodb://localhost:27017")
  .then((ms: any) => console.log("success"));

export default app;
