import { Response, NextFunction } from "express";
import { Request } from "../interfaces/auth";
import HttpStatusCodes from "http-status-codes";

import * as reviewServices from "../services/reviews";

export async function createReview(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { body } = req;
  const userId = req.user!.id;
  const { id } = req.params;

  try {
    const data = await reviewServices.createReview(body, userId, id);
    return res.status(HttpStatusCodes.CREATED).json({
      message: "Created Succesfully",
      new_review: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function getReviews(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id;
  const { id } = req.params;
  try {
    const data = await reviewServices.getReviews(id, userId);
    res.status(HttpStatusCodes.OK).send(data);
  } catch (error) {
    next(error);
  }
}
