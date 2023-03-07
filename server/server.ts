import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { MongoClient, MongoCursorInUseError, ObjectId} from "mongodb";

const uri:string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@lotr-cluster.l9mo3yk.mongodb.net/?retryWrites=true&w=majority`;
const dbClient = new MongoClient(uri);

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

app.set("port", 5005);

interface User {
  _id?:       ObjectId;
  name:       string;
  highscore:  number;
  favorites:  Favorite[];
  blacklist:  Blacklist[];
}
interface Favorite {
  characterName:  string;
  quote:      string[];
}
interface Blacklist {
  quote:    string[];
  reason:   string[];
}
let users:User[] = [
  {
    _id: new ObjectId(1), 
    name:"Dimitri",
    highscore: 7,
    favorites: [],
    blacklist: []
  },
  {
    _id: new ObjectId(2), 
    name: "Mira",
    highscore: 9,
    favorites: [],
    blacklist: []
  },
  {
    _id: new ObjectId(3), 
    name: "Gwen",
    highscore: 9,
    favorites: [],
    blacklist: []
  },
  {
    _id: new ObjectId(4), 
    name: "Michiel", 
    highscore: 7,
    favorites: [],
    blacklist: []
  }

];
//const createUserDB = async (user:User) => {
const fillUserDb = async () => {
  try {
    await dbClient.connect();
    await dbClient.db("LOTR-app").collection("Users").insertMany(users);
  } catch (err) {
    console.log(err);
  } finally {
    dbClient.close();
  }
}
//fillUserDb();

app.get("/api/users", (req, res) => {
  res.type("application/json");
  res.json(users);
});



app.listen(app.get("port"), async () => {
  console.log(`Local url: http://localhost:${app.get("port")}`);
})
