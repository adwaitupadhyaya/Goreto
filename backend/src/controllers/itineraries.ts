import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import * as itinerayServices from "../services/itineraries";
import HttpStatusCodes from "http-status-codes";

export async function createItinerary(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { body } = req;
  const userId = req.user!.id;
  try {
    await itinerayServices.createItinerary(body, userId);

    return res.status(HttpStatusCodes.CREATED).json({
      message: "Created Succesfully",
      new_itinerary: body,
    });
  } catch (error) {
    next(error);
  }
}
