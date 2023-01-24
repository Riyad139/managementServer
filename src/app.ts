import express, { Application, Request, Response, NextFunction } from "express";
import addUserToReq from "./middleware/addUserToReq";
import mongoose from "mongoose";
import router from "./Route/route";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(addUserToReq);
app.use(router);

// app.get("/", router);



mongoose
  .connect("mongodb://localhost:27017")
  .then((ms: any) => console.log("success"));

export default app;
