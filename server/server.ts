import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routers/userRouter";
import quoteRoutes from "./routers/quoteRouter";
import movieRoutes from "./routers/movieRouter";
import characterRouter from "./routers/characterRouter";
import quizRouter from "./routers/quizRouter";
import authRouter from "./routers/authRouter";
import authController from "./controllers/authController";
import { connectDb } from "./db";

const app = express();

app.use(express.json({limit: '1mb' }));
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(cors(
  {
    origin: [`http://localhost:3005`, `${process.env.CLIENT_URL}`],
    credentials: true
  }
));

app.set("port", process.env.PORT || 3000);

const prefixUrl:string = "/api/";

app.use(authRouter.router);
app.use(`${prefixUrl}users`, authController.authorize, userRoutes.router);
app.use(`${prefixUrl}quotes`, authController.authorize, quoteRoutes.router);
app.use(`${prefixUrl}movies`, authController.authorize, movieRoutes.router);
app.use(`${prefixUrl}characters`, authController.authorize, characterRouter.router);
app.use(`${prefixUrl}quiz`, authController.authorize, quizRouter.router);


app.listen(app.get("port"), async () => {
  await connectDb();
  console.log(`Server started at port: ${app.get("port")}`);
})
