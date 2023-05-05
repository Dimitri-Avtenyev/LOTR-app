import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { MongoClient } from "mongodb";
import userRoutes from "./routers/userRouter";
import quoteRoutes from "./routers/quoteRouter";
import movieRoutes from "./routers/movieRouter";
import characterRouter from "./routers/characterRouter";
import quizRouter from "./routers/quizRouter";
import failsafeService from "./services/failsafeService";
import authRouter from "./routers/authRouter";

const uri:string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@lotr-cluster.l9mo3yk.mongodb.net/?retryWrites=true&w=majority`;
export const dbClient = new MongoClient(uri);

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
app.use(`${prefixUrl}users`, userRoutes.router);
app.use(`${prefixUrl}quotes`, quoteRoutes.router);
app.use(`${prefixUrl}movies`, movieRoutes.router);
app.use(`${prefixUrl}characters`, characterRouter.router);
app.use(`${prefixUrl}quiz`, quizRouter.router);

const connectDb = async () => {
  try {
    await dbClient.connect();
    console.log("Db connection has been opened.")
    process.on("SIGINT", closeDb);
    await failsafeService.populateDb();
  } catch (err) {
    console.log(err);
  }
}
const closeDb = async () => {
  try {
    await dbClient.close();
    console.log("Db connection has been closed.");
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
}
app.listen(app.get("port"), async () => {
  await connectDb();
  console.log(`Server started at port: ${app.get("port")}`);
})
