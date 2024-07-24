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

  static async get() {
    const data = await this.queryBuilder()
      .distinct("itineraries.title")
      .select(
        "itineraries.description",
        "itineraries.number_of_days",
        "itineraries.difficulty",
        "photos.photo_url"
      )
      .table("itineraries")
      .innerJoin("photos", "photos.itinerary_id", "itineraries.id");

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

  static async update(
    itinerary: Omit<IItinerary, "id" | "created_by">,
    userId: string,
    itineraryId: string
  ) {
    const itineraryObject = {
      title: itinerary.title,
      description: itinerary.description,
      number_of_days: itinerary.number_of_days,
      difficulty: itinerary.difficulty,
    };

    // Update the itinerary details
    await this.queryBuilder()
      .update(itineraryObject)
      .table("itineraries")
      .where({ id: itineraryId, created_by: userId });

    const locations = itinerary.path;

    // Delete existing locations for the itinerary
    await this.queryBuilder()
      .delete()
      .from("itineraryLocations")
      .where({ itineraryId });

    // Insert new locations
    for (let day = 0; day < locations.length; day++) {
      const locationName = locations[day];

      // Check if the location already exists in the "locations" table
      let [location] = await this.queryBuilder()
        .select("id")
        .from("locations")
        .where({ location_name: locationName });

      // If the location does not exist, insert it and get the new location ID
      if (!location) {
        [location] = await this.queryBuilder()
          .insert({ location_name: locationName })
          .into("locations")
          .returning("id");
      }

      // Insert into itineraryLocations with the correct day
      const itineraryLocation = {
        locationId: location.id,
        itineraryId,
        day: day + 1,
      };

      await this.queryBuilder()
        .insert(itineraryLocation)
        .into("itineraryLocations");
    }

    const updatedItinerary = await this.queryBuilder()
      .select(
        " itineraries.title",
        "itineraries.description",
        "itineraries.number_of_days",
        "itineraries.difficulty",
        " itinerary_locations.day"
      )
      .table("itineraries")
      .innerJoin(
        "itinerary_locations",
        "itineraries.id",
        "itinerary_locations.itinerary_id"
      )
      .innerJoin("locations", "locations.id", "itinerary_locations.location_id")
      .where({ "itineraries.id": +itineraryId });

    return updatedItinerary;
  }

  static async delete(itineraryId: string) {
    await this.queryBuilder()
      .delete()
      .table("itinerary_locations")
      .where({ itineraryId });
    await this.queryBuilder().delete().table("itineraries").where({
      "itineraries.id": itineraryId,
    });
  }
}
