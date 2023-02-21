import express from "express";
import addUserToReq from "./middleware/addUserToReq";
import mongoose from "mongoose";
import router from "./Route/route";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());
//@ts-ignore

app.use(addUserToReq.unless({ path: "/user/signup" }));
app.use(router);

mongoose
  .connect("mongodb://localhost:27017")
  .then((ms: any) => console.log("success"));

export default app;
