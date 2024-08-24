import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import ConnectDb from "./utils/db.js";
import UserRouter from "../backend/routes/user.routes.js";
import comapnyRouter from "../backend/routes/comapny.routes.js";
import jobRouter from "../backend/routes/jobs.routes.js";
import applicationRouter from "../backend/routes/application.routes.js";

dotenv.config({});

const Port = 8080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser()); 

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

app.use("/api/user/", UserRouter);
app.use("/api/comapny/", comapnyRouter);
app.use("/api/job/", jobRouter);
app.use("/api/application/", applicationRouter);

app.listen(Port, () => {
  ConnectDb();
  console.log(`Server running on ${Port}`);
});
