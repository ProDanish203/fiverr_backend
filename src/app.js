import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors);
app.use(express.json({ limit: "16kb" }));
app.use(express.static("public"));
// For url inputs
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(morgan("dev"));
app.use(cookieParser());
app.disable("x-powered-by");

export { app };
