import multer from "multer";
import { Request } from "express";

const storage = multer.diskStorage({
  destination: function (req: Request, file: Express.Multer.File, cb) {
    cb(null, "./uploads");
  },
  filename: function (req: Request, file: Express.Multer.File, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filename = uniqueSuffix + "-" + file.originalname;
    cb(null, filename);
  },
});

export const upload = multer({ storage });
