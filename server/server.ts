import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { MongoClient, MongoCursorInUseError, ObjectId} from "mongodb";
import userRoutes from "./routers/userRouter";
import { User } from "./types";

const uri:string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@lotr-cluster.l9mo3yk.mongodb.net/?retryWrites=true&w=majority`;
export const dbClient = new MongoClient(uri);


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.set("port", process.env.PORT || 3000);

app.use("/api/users", userRoutes.router);
// app.use(<PATH>, <router>);

app.listen(app.get("port"), async () => {
  console.log(`Local url: http://localhost:${app.get("port")}`);
})
