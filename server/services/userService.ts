import { dbClient } from "../server"
import { User } from "../types";

const getAllUsers = async () => {

  let users:User[] = [] ;

  // try {
  //   await dbClient.connect();
  //   let cursor = await dbClient.db("LOTR-app").collection("Ussers").find<User>({});
  //   users = await cursor.toArray();

  // } catch (err) {
  //   console.log(err);
  // } finally {
  //   dbClient.close();
  // }

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
  return users;
}

export default {
  getAllUsers
}
