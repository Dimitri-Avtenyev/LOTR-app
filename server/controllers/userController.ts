import userService, { COLLECTION_HIGHSCORES, COLLECTION_USERS } from "../services/userService";
import { User, UserBasic, UserCredentials } from "../types";

const getUsersHighscore = async (req:any, res:any) => {
  res.type("application/json");
  const  users  = await userService.getUsersHighscore();
  res.status(200).json(users);
 
}

const addUser = async (req:any, res:any) => {
  res.type("application/json");
  let user:User = {
    username:       req.body.email,
    password:       req.body.password, 
    avatarID:       1,
    highscore:      0,
    favorites:      [],
    blacklist:      []
  }

  await userService.createUser(user);
  res.status(201).json(user);
}
const loginUser = async (req:any, res:any) => {
  res.type("application/json");

  let userCredentials : UserCredentials= {
    username: req.body.email,
    password: req.body.password
  }

  let foundUser:User|null = await userService.getUser(userCredentials.username);
  if (foundUser !== null && foundUser.password === userCredentials.password) {
    let userBasic:UserBasic = {
      username: foundUser.username,
      avatarID: foundUser.avatarID,
      highscore: foundUser.highscore,
      favorites: foundUser.favorites,
      blacklist: foundUser.blacklist
    }
   res.status(200).json(userBasic);
  } 
  res.status(404);

}
const addUserToHighscores = async (req:any, res:any) => {
  let username:string = req.body.username;
  let score:number = parseInt(req.body.score);
  
  await userService.addUserToHighscores({userName:username, score: score});

  res.sendStatus(200);

}
const getAllUsers = async (req:any, res:any) => {
  res.type("application/json");
  const users = await userService.getAllUsers();
  res.status(200).json(users);
}
const emptyHighscoresCollection = async (req:any, res:any) => {
  await userService.emptyCollection(COLLECTION_HIGHSCORES);
  res.send("Collection deleted");
}
const emptyUsersCollection = async (req:any, res:any) => {
  await userService.emptyCollection(COLLECTION_USERS);
  res.send("Collection deleted");
}
export default {
  getUsersHighscore,
  addUser,
  loginUser,
  addUserToHighscores,
  emptyHighscoresCollection,
  emptyUsersCollection,
  getAllUsers
}