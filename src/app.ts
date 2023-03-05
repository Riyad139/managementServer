import dotenv from "dotenv";
import express from "express";
import addUserToReq from "./middleware/addUserToReq";
import mongoose from "mongoose";
import router from "./Route/route";
import cookieParser from "cookie-parser";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

//@ts-ignore
app.use(addUserToReq.unless({ path: ["/user/signup", "/user/signin"] }));
app.use(router);
//@ts-ignore
mongoose.connect(process.env.DB_URL).then((ms: any) => console.log("success"));

export default app;
