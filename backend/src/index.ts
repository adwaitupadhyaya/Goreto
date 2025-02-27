import express from "express";
import config from "./config";
import router from "./routes";
import cors from "cors";
import { genericErrorHandler, notFoundError } from "./middlewares/errorHandler";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);
app.use(notFoundError);
app.use(genericErrorHandler);

app.listen(config.port, () => {
  console.log(`Server listening on port ${config.port}`);
});
