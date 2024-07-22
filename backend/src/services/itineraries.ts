import { createItinerarySchema } from "./../schema/itineraries";
import * as ItineraryModel from "../models/itineraries";
import { IItinerary } from "../interfaces/itinerary";

export async function createItinerary(
  body: Omit<IItinerary, "id" | "created_by">,
  id: string
) {
  await ItineraryModel.ItineraryModel.create(body, id);
}
