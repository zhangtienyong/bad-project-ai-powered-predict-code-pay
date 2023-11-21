import { Request, Response } from "express";

type HandlerType = (req: Request, res: Response) => Promise<void>;

export const asyncWrapper = (handler: HandlerType) => async (req: Request, res: Response) => {
  try {
    await handler(req, res);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "internal server error" });
  }
};
