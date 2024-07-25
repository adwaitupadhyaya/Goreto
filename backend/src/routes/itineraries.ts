import { createReviewSchema } from "./../schema/reviews";
import express from "express";
import {
  createItinerary,
  deleteItinerary,
  getItineraries,
  getItineraryById,
  updateItinerary,
} from "../controllers/itineraries";
import { authenticate } from "../middlewares/auth";
import { createItinerarySchema } from "../schema/itineraries";
import { validateReqBody } from "../middlewares/validator";
import { createReview, getReviews } from "../controllers/reviews";

const router = express();

router.post(
  "/",
  authenticate,
  validateReqBody(createItinerarySchema),
  createItinerary
);

router.get("/", getItineraries);
router.get("/:id", getItineraryById);
router.put("/:id", authenticate, updateItinerary);
router.delete("/:id", authenticate, deleteItinerary);

// reviews
router.post(
  "/:id/reviews",
  authenticate,
  validateReqBody(createReviewSchema),
  createReview
);

router.get("/:id/reviews", authenticate, getReviews);

export default router;
