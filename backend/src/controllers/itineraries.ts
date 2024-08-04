import { MulterRequest } from "./../interfaces/multer";
import { NextFunction, Response } from "express";
import { Request } from "../interfaces/auth";
import * as itineraryServices from "../services/itineraries";
import HttpStatusCodes from "http-status-codes";
import { log } from "console";
import { BadRequestError } from "../error/BadRequestError";
import { ItineraryImage } from "../interfaces/itinerary";
export async function createItinerary(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const multerReq = req as MulterRequest;
  const { files } = multerReq;
  const { body } = req;
  const userId = req.user!.id;
  try {
    if (!files || Object.keys(files).length === 0) {
      next(new BadRequestError("no files uploaded"));
      return;
    }
    const imagesPath: ItineraryImage = {
      photo: files.photo_url[0].path,
    };

    await itineraryServices.createItinerary(body, imagesPath, userId);

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
  const { query } = req;

  try {
    const data = await itineraryServices.getItineraries(query);
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
  const itineraryId = req.params.id;
  try {
    const data = await itineraryServices.getItineraryById(itineraryId);
    res.status(HttpStatusCodes.OK).json(data);
  } catch (error) {
    next(error);
  }
}

export async function getByUserId(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const userId = req.user!.id;
  try {
    const data = await itineraryServices.getByUserId(userId);
    res.status(HttpStatusCodes.OK).send(data);
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
