import { dbClient } from "../server"
import { User, UserHighscore } from "../types";

const DB_NAME:string = "LOTR-app";
const COLLECTION_USERS:string= "Users";
const COLLECTION_HIGHSCORES:string = "Highscores";

const getUsersHighscore = async () => {

  let users:UserHighscore[] = [] ;

  try {
    await dbClient.connect();
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_HIGHSCORES).find<UserHighscore>({});
    users = await cursor.toArray();

    if (users.length <= 0) {
        // sample data 
      users = [
        {
          userName:       "testUser",
          score:      10
        }, 
        {
          userName:       "testUser_2",
          score:      7
        }
      ]
    }
  } catch (err) {
    console.log(err);
  } finally {
    dbClient.close();
  }

  return users;
}

const addUserToHighscores = async (user:UserHighscore) => {
  try {
    await dbClient.connect();
    await dbClient.db(DB_NAME).collection(COLLECTION_HIGHSCORES).insertOne(user);

  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
}
const emptyCollection = async () => {
  try {
    await dbClient.connect();
    await dbClient.db(DB_NAME).collection(COLLECTION_HIGHSCORES).deleteMany({});
  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
}
const createUser = async (user:User) => {
  try {
    await dbClient.connect();
    await dbClient.db(DB_NAME).collection(COLLECTION_USERS).insertOne(user);

  } catch (err) {

  } finally {
    await dbClient.close();
  }
}

const getAllUsers = async () => { //dev env
  let users:User[] = [];
  try {
    await dbClient.connect();
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_USERS).find<User>({});
    users = await cursor.toArray();

  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
  return users;
}
export default {
  getUsersHighscore,
  createUser,
  addUserToHighscores,
  emptyCollection,
  getAllUsers
}
