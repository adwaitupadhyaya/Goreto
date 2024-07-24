import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import * as itineraryServices from "../services/itineraries";
import HttpStatusCodes from "http-status-codes";

export async function createItinerary(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { body } = req;
  const userId = req.user!.id;
  try {
    await itineraryServices.createItinerary(body, userId);

    return res.status(HttpStatusCodes.CREATED).json({
      message: "Created Succesfully",
      new_itinerary: body,
    });
  } catch (error) {
    next(error);
  }
}

export async function getItineraries(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const data = await itineraryServices.getItineraries();
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getItineraryById(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user!;
  const itineraryId = req.params.id;
  try {
    const data = await itineraryServices.getItineraryById(id, itineraryId);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function updateItinerary(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user!;
  const itineraryId = req.params.id;

  try {
    const data = await itineraryServices.updateItinerary(
      id,
      itineraryId,
      req.body
    );
    res.status(HttpStatusCodes.OK).json({
      message: "Itinerary Updated successfully",
      updatedItinerary: data,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteItinerary(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { id } = req.user!;
  const itineraryId = req.params.id;

  try {
    await itineraryServices.deleteItinerary(id, itineraryId);
    res.status(HttpStatusCodes.OK).json({
      message: "Itinerary Deleted successfully",
    });
  } catch (error) {
    next(error);
  }
}
