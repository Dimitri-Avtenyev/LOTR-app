import { ObjectId } from "mongodb";
import { dbClient } from "../db";
import { User, UserBasic } from "../types";

const DB_NAME: string = "LOTR-app";
export const COLLECTION_USERS: string = "Users";

const getUser = async (username: string): Promise<User | null> => {
  let foundUser: User | null = null;

  try {
    if (username) {
      foundUser = await dbClient.db(DB_NAME).collection(COLLECTION_USERS).findOne<User>({ username: username });
    }
  } catch (err) {
    console.log(err);
  }
  return foundUser;
}

const createUser = async (user: User): Promise<void> => {
  try {
    await dbClient.db(DB_NAME).collection(COLLECTION_USERS).insertOne(user);
  } catch (err) {
    console.log(err);
  }
}

const getAllUsers = async (): Promise<User[]> => {
  let users: User[] = [];
  try {
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_USERS).find<User>({});
    users = await cursor.toArray();

  } catch (err) {
    console.log(err);
  }
  return users;
}

const updateUser = async (user: UserBasic): Promise<void> => {

  try {
    await dbClient.db(DB_NAME).collection(COLLECTION_USERS).updateOne(
      { username: user.username},
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
  }
}
const deleteItemFromUserList = async (userId: string, typelist: string, itemId: string) => {

  if (typelist === "favorites") {
    try {
      //console.log(`deleting favorite..${itemId} from user: ${userId}`);
      await dbClient.db(DB_NAME).collection(COLLECTION_USERS).updateOne(
        { _id: new ObjectId(userId) },
        {
        $pull: {favorites: {"quote.id": itemId}}
        }
      )
      
    } catch (err) {
      console.log(err);
    }
  } else if (typelist === "blacklist") {
    try {
    
      await dbClient.db(DB_NAME).collection(COLLECTION_USERS).updateOne(
        {
          _id: new ObjectId(userId)
        }, {
          $pull: {blacklist: { "quote.id":  itemId} }
      }
      )
    } catch (err) {
      console.log(err);
    }
  }

}
const emptyCollection = async (collection: string): Promise<void> => {
  try {
    await dbClient.db(DB_NAME).collection(collection).deleteMany({});
  } catch (err) {
    console.log(err);
  }
}

export default {
  createUser,
  getUser,
  emptyCollection,
  getAllUsers,
  updateUser,
  deleteItemFromUserList
}

