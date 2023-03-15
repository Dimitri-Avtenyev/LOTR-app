import { dbClient } from "../server"
import { User } from "../types";

const getAllUsers = async () => {

  let users:User[] = [] ;

  try {
    await dbClient.connect();
    let cursor = await dbClient.db("LOTR-app").collection("Users").find<User>({});
    users = await cursor.toArray();

    if (users.length <= 0) {
        // sample data for tests
      users = [
        {
          userName:       "testUser",
          password:       "123ABC",
          highscore:      10,
          favorites:      [],
          blacklist:      []
        }, 
        {
          userName:       "testUser_2",
          password:       "123ABC_2",
          highscore:      7,
          favorites:      [],
          blacklist:      []
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

const createUser = async () => {
  let user:User = {
    userName:       "Gandalf",
    password:       "ABC123",
    highscore:      900,
    favorites:      [],
    blacklist:      []
  }
  try {
    await dbClient.connect();
    await dbClient.db("LOTR-app").collection("Users").insertOne(user);

  } catch (err) {

  } finally {
    await dbClient.close();
  }
}
export default {
  getAllUsers,
  createUser
}
