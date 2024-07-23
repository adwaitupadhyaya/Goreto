import { NotFoundError } from "../error/NotFoundError";
import { IReview } from "../interfaces/reviews";
import * as ReviewModel from "../models/reviews";
import * as itineraryServices from "../services/itineraries";

export async function createReview(
  body: Pick<IReview, "rating" | "content">,
  userId: string,
  itineraryId: string
) {
  const existingItinerary = await itineraryServices.getItineraryById(
    userId,
    itineraryId
  );

  if (!existingItinerary) {
    throw new NotFoundError(`Itinerary with id ${itineraryId} does not exist`);
  }
  const review_obj = {
    rating: body.rating,
    content: body.content,
    reviewed_by: userId,
    itinerary_id: itineraryId,
  };
  return await ReviewModel.ReviewModel.create(review_obj);
}

export async function getReviews(id: string, userId: string) {
  const existingItinerary = await itineraryServices.getItineraryById(
    userId,
    id
  );

  if (!existingItinerary) {
    throw new NotFoundError(`Itinerary with id ${id} does not exist`);
  }
  const reviews = await ReviewModel.ReviewModel.get(id);
  return reviews;
}
