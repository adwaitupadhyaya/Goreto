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

  static async get(userId: string) {
    const data = await this.queryBuilder()
      .select(
        " itineraries.title",
        "itineraries.description",
        "itineraries.number_of_days",
        "itineraries.difficulty",
        " itinerary_locations.day",
        "locations.location_name"
      )
      .table("itineraries")
      .innerJoin(
        "itinerary_locations",
        "itineraries.id",
        "itinerary_locations.itinerary_id"
      )
      .innerJoin("locations", "locations.id", "itinerary_locations.location_id")
      .where({ "itineraries.created_by": +userId });

    return data;
  }

  static async getById(userId: string, id: string) {
    const data = await this.queryBuilder()
      .select(
        " itineraries.title",
        "itineraries.description",
        "itineraries.number_of_days",
        "itineraries.difficulty",
        " itinerary_locations.day",
        "locations.location_name"
      )
      .table("itineraries")
      .innerJoin(
        "itinerary_locations",
        "itineraries.id",
        "itinerary_locations.itinerary_id"
      )
      .innerJoin("locations", "locations.id", "itinerary_locations.location_id")
      .where({ "itineraries.created_by": +userId })
      .where({ "itineraries.id": +id });

    return data;
  }
}
