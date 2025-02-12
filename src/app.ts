import express from "express";
import morgan from "morgan";
import swaggerUi from "swagger-ui-express";
import cors from "cors";
import mainBookHubRouter from "./main.bookhub.routes";
import swaggerSpec from "./config/swaggerConfig";
import { error } from "./error/error.bookhub.app";

const app = express();

// Middleware to parse JSON request bodies
app.disable("x-powered-by")
app.use(express.json());
app.use(cors({ origin: true, credentials: true, optionsSuccessStatus: 204 }));
app.use(morgan("dev"));
app.set("trust proxy", true);

// Serve Swagger UI documentation
app.use("/api-docs/v1/book-hub", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Mount the main BookHub router
app.use("/v1/book-hub", mainBookHubRouter);

app.use(error.errorHandle);

export default app;
