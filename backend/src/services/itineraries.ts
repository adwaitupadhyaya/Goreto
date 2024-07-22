import { NotFoundError } from "./../error/NotFoundError";
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
    throw new NotFoundError(`Itinerary with id ${id} not found`);
  }

  return data;
}

export async function updateItinerary(
  userId: string,
  id: string,
  body: Omit<IItinerary, "id" | "created_by">
) {
  const itineraryExists = await ItineraryModel.ItineraryModel.getById(
    userId,
    id
  );
  if (itineraryExists.length === 0) {
    throw new NotFoundError(`Itinerary with id ${id} not found`);
  }

  return await ItineraryModel.ItineraryModel.update(body, userId, id);
}

export async function deleteItinerary(userId: string, id: string) {
  const itineraryExists = await ItineraryModel.ItineraryModel.getById(
    userId,
    id
  );
  if (itineraryExists.length === 0) {
    throw new NotFoundError(`Itinerary with id ${id} not found`);
  }

  await ItineraryModel.ItineraryModel.delete(id);
}
