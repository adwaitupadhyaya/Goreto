import { IReview } from "../interfaces/reviews";
import { BaseModel } from "./base";

export class ReviewModel extends BaseModel {
  static async create(review: Omit<IReview, "id">) {
    const newReview = {
      reviewedBy: review.reviewed_by,
      itineraryId: review.itinerary_id,
      rating: review.rating,
      content: review.content,
    };
    const data = await this.queryBuilder().insert(newReview).table("reviews");

    return review;
  }

  static async get(itineraryId: string) {
    const reviews = await this.queryBuilder()
      .select(
        "reviews.rating",
        "reviews.content",
        "users.username",
        "users.profilePicture",
        "reviews.created_at"
      )
      .table("reviews")
      .leftJoin("users", "users.id", "reviews.reviewed_by")
      .where({ itineraryId })
      .orderBy("reviews.rating", "desc");
    return reviews;
  }
}
