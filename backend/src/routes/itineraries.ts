import express from "express";
import {
  createItinerary,
  getItineraries,
  getItineraryById,
} from "../controllers/itineraries";
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

router.get("/", authenticate, getItineraries);
router.get("/:id", authenticate, getItineraryById);

export default router;
