import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import express from "express";

dotenv.config();

const app = express();
//app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());
app.use(cookieParser());

//@ts-ignore
// app.use(addUserToReq.unless({ path: ["/user/signup", "/user/signin"] }));
// app.use(router);
//@ts-ignore
//mongoose.connect(process.env.DB_URL).then((ms: any) => console.log("success"));

app.get("/api/test", (req, res, next) => {
  res.send("Hello");
});

export default app;
