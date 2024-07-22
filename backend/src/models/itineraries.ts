import { IItinerary } from "../interfaces/itinerary";
import { createItinerarySchema } from "../schema/itineraries";
import { BaseModel } from "./base";

export class ItineraryModel extends BaseModel {
  static async create(
    itinerary: Omit<IItinerary, "id" | "created_by">,
    id: string
  ) {
    const itineraryObject = {
      created_by: id,
      title: itinerary.title,
      description: itinerary.description,
      number_of_days: itinerary.number_of_days,
      difficulty: itinerary.difficulty,
    };

    const [itineraryId] = await this.queryBuilder()
      .insert(itineraryObject)
      .table("itineraries")
      .returning("id");

    const locations = itinerary.path;
    for (const locationName of locations) {
      const [locationId] = await this.queryBuilder()
        .insert({ location_name: locationName })
        .table("locations")
        .returning("id");
      console.log(locationId, itineraryId);
      const itineraryLocation = {
        locationId: locationId.id,
        itineraryId: itineraryId.id,
        day: locations.indexOf(locationName) + 1,
      };
      await this.queryBuilder()
        .insert(itineraryLocation)
        .table("itineraryLocations");
    }
  }
}
