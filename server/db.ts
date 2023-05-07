import { MongoClient } from "mongodb";
import failsafeService from "./services/failsafeService";

const uri:string = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PSW}@lotr-cluster.l9mo3yk.mongodb.net/?retryWrites=true&w=majority`;
export const dbClient = new MongoClient(uri);

export const connectDb = async () => {
  try {
    await dbClient.connect();
    console.log("Db connection has been opened.")
    process.on("SIGINT", closeDb);
    await failsafeService.populateDb();
  } catch (err) {
    console.log(err);
  }
}
export const closeDb = async () => {
  try {
    await dbClient.close();
    console.log("Db connection has been closed.");
  } catch (err) {
    console.log(err);
  }
  process.exit(0);
}