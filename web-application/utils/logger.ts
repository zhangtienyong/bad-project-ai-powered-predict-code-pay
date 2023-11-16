import winston from "winston";

// Create a logger instance
const logger = winston.createLogger({
  level: "info", // Logging level
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
  ],
});

export default logger;
