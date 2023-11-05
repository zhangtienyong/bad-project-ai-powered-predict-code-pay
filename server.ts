import express from "express";
import path from "path";
import { apiRoutes } from "./routers/routes";
import logger from "./utils/logger";


const app = express();

app.use("/", apiRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));

const PORT = 3000;
app.listen(PORT, () => {
  logger.info(`Server is listening at http://localhost:${PORT}`);
});
