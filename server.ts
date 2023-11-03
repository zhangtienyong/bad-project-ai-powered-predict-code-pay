import express from "express";
import path from "path";
import { apiRoutes } from "./routers/routes";

const app = express();

app.use("/", apiRoutes);
app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.use(express.static(path.join(__dirname, "public")));

const PORT = 8080;
app.listen(PORT, () => {
  console.log(`listening at http://localhost:${PORT}`);
});
