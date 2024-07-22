import { BadRequestError } from "./../error/BadRequestError";
import { createItinerarySchema } from "./../schema/itineraries";
import * as ItineraryModel from "../models/itineraries";
import { IItinerary } from "../interfaces/itinerary";

export async function createItinerary(
  body: Omit<IItinerary, "id" | "created_by">,
  id: string
) {
  await ItineraryModel.ItineraryModel.create(body, id);
}

export async function getItineraries(userId: string) {
  return await ItineraryModel.ItineraryModel.get(userId);
}

export async function getItineraryById(userId: string, id: string) {
  const data = await ItineraryModel.ItineraryModel.getById(userId, id);

  if (data.length === 0) {
    throw new BadRequestError(`Itinerary with id ${id} not found`);
  }

  return data;
}
