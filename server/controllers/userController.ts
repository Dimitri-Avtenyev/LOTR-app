import userService from "../services/userService";
import { User } from "../types";

const getUsersHighscore = async (req:any, res:any) => {
  res.type("application/json");
  const  users  = await userService.getUsersHighscore();
  res.status(200).json(users);
 
}

const addUser = async (req:any, res:any) => {

  res.type("application/json");
  let user:User = {
    username:       req.body.username,
    password:       req.body.password,  //placeholder plain text -> implement crypto
    highscore:      0,
    favorites:      [],
    blacklist:      []
  }

  await userService.createUser(user);
  res.status(200).json(user);
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
  await userService.emptyCollection();
  res.send("Collection deleted");
}
export default {
  getUsersHighscore,
  addUser,
  addUserToHighscores,
  emptyHighscoresCollection,
  getAllUsers
}