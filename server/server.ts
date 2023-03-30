import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { MongoClient, MongoCursorInUseError, ObjectId} from "mongodb";
import userRoutes from "./routers/userRouter";
import quoteRoutes from "./routers/quoteRouter";
import movieRoutes from "./routers/movieRouter";
import characterRouter from "./routers/characterRouter";
import quizRouter from "./routers/quizRouter";

const uri:string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@lotr-cluster.l9mo3yk.mongodb.net/?retryWrites=true&w=majority`;
export const dbClient = new MongoClient(uri);


const app = express();

app.use(express.json({limit: '1mb' }));
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.set("port", process.env.PORT || 3000);

const prefixUrl:string = "/api/";

app.use(`${prefixUrl}users`, userRoutes.router);
app.use(`${prefixUrl}quotes`, quoteRoutes.router);
app.use(`${prefixUrl}movies`, movieRoutes.router);
app.use(`${prefixUrl}characters`, characterRouter.router);
app.use(`${prefixUrl}quiz`, quizRouter.router);

app.listen(app.get("port"), async () => {
  console.log(`Local url: http://localhost:${app.get("port")}`);
})
