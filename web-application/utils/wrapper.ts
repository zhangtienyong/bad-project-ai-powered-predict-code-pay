import { Request, Response } from "express";
import { ApplicationError } from "./error";

type HandlerType = (req: Request, res: Response) => Promise<void>;

export const asyncWrapper = (handler: HandlerType) => async (req: Request, res: Response) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error(err.message);
    if (err instanceof ApplicationError) {
      res.status(err.httpCode).json({ error: err.message });
    } else {
      res.status(500).json({ error: "internal server error" });
    }
  }
};
