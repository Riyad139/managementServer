// export {};
import { RequestHandler } from "express";

declare global {
  interface Controller extends RequestHandler {}

  namespace Express {
    export interface Request {
      userr?: any;
    }
  }
}
