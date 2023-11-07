import express from "express";
import path from "path";
import expressSession from "express-session";
import { apiRoutes } from "./routers/routes";
import logger from "./utils/logger";


const app = express();

// 1. third party middleware

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  expressSession({
    secret: "group8BADProject",
    resave: true,
    saveUninitialized: true,
    cookie: {
      maxAge: 30 * 60 * 1000,
    },
  })
);

declare module "express-session" {
  interface SessionData {
    user: { 
      email: string; 
      userId: number;  
      github_id: number;
      github_username: string,
      role: string,
    };

  }
}

// 2. custom middleware

// 3. route handler
app.use(apiRoutes);

// 4. serve files
app.use(express.static(path.join(__dirname, "public")))
app.use(express.static(path.join(__dirname, "public", "html"), { extensions: ["html"] }));

// 5. 404 handler
app.use((_req, res) => {
  res.sendFile(path.join(__dirname, "public", "html", "404.html"));
});

const PORT = 8080;
app.listen(PORT, () => {
  logger.info(`Server is listening at http://localhost:${PORT}`);
});
