import express, { Application, Request, Response, NextFunction } from "express";

const app = express();
app.use(express.json());
app.get("/", (req: Request, res: Response) => {
  res.send("hello world");
});







module.exports = app;
