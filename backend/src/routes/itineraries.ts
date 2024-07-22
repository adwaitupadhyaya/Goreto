import express from "express";
import { createItinerary } from "../controllers/itineraries";
import { authenticate } from "../middlewares/auth";
import { createItinerarySchema } from "../schema/itineraries";
import { validateReqBody } from "../middlewares/validator";

const router = express();

router.post(
  "/",
  authenticate,
  validateReqBody(createItinerarySchema),
  createItinerary
);

export default router;
