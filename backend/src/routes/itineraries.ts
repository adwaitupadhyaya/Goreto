import { createReviewSchema } from "./../schema/reviews";
import express from "express";
import {
  createItinerary,
  deleteItinerary,
  getItineraries,
  getItineraryById,
  updateItinerary,
  getByUserId,
} from "../controllers/itineraries";
import { authenticate } from "../middlewares/auth";
import { createItinerarySchema } from "../schema/itineraries";
import { validateReqBody } from "../middlewares/validator";
import { createReview, getReviews } from "../controllers/reviews";
import { upload } from "../middlewares/multer";
import { BadRequestError } from "../error/BadRequestError";

const router = express();

router.post(
  "/",
  upload.fields([{ name: "photo_url", maxCount: 1 }]),
  authenticate,
  (req, res, next) => {
    const { body } = req;
    try {
      body.path = JSON.parse(body.path);
      next();
    } catch (e) {
      return next(new BadRequestError("Invalid path format"));
    }
  },
  validateReqBody(createItinerarySchema),
  createItinerary
);

router.get("/", getItineraries);
router.get("/getByUserss", authenticate, getByUserId);
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

router.get("/:id/reviews", getReviews);

export default router;
