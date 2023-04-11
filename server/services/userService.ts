import { dbClient } from "../server"
import { Favorite, Quote, User, UserBasic, UserHighscore } from "../types";

const DB_NAME: string = "LOTR-app";
export const COLLECTION_USERS: string = "Users";
export const COLLECTION_HIGHSCORES: string = "Highscores";


const getUser = async (email: string): Promise<User | null> => {
  let foundUser: User | null = null;

  try {
    await dbClient.connect();
    foundUser = await dbClient.db(DB_NAME).collection(COLLECTION_USERS).findOne<User>({ username: email });

  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
  return foundUser;
}
const getUsersHighscore = async () => {

  let users: UserHighscore[] = [];

  try {
    await dbClient.connect();
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_HIGHSCORES).find<UserHighscore>({});
    users = await cursor.toArray();

    if (users.length <= 0) {
      // sample data 
      users = [
        {
          userName: "testUser",
          score: 10
        },
        {
          userName: "testUser_2",
          score: 7
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

const addUserToHighscores = async (user: UserHighscore) => {
  try {
    await dbClient.connect();
    await dbClient.db(DB_NAME).collection(COLLECTION_HIGHSCORES).insertOne(user);

  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
}
const emptyCollection = async (collection: string) => {
  try {
    await dbClient.connect();
    await dbClient.db(DB_NAME).collection(collection).deleteMany({});
  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
}
const createUser = async (user: User) => {
  try {
    await dbClient.connect();
    await dbClient.db(DB_NAME).collection(COLLECTION_USERS).insertOne(user);

  } catch (err) {

  } finally {
    await dbClient.close();
  }
}

const getAllUsers = async () => { //dev env
  let users: User[] = [];
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

const updateUser = async (user: UserBasic) => {

  try {
    await dbClient.connect();
    await dbClient.db(DB_NAME).collection(COLLECTION_USERS).updateOne(
      { username: user.username },
      {
        $set: {
          avatarID: user.avatarID,
          highscore: user.highscore,
          favorites: user.favorites,
          blacklist: user.blacklist
        }
      }
    )
  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
}

export default {
  getUsersHighscore,
  createUser,
  getUser,
  addUserToHighscores,
  emptyCollection,
  getAllUsers,
  updateUser
}

