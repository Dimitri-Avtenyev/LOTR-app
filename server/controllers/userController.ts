import userService, { COLLECTION_HIGHSCORES, COLLECTION_USERS } from "../services/userService";
import { User, UserBasic, UserCredentials } from "../types";

const getUsersHighscore = async (req:any, res:any) => {
  res.type("application/json");
  const  users  = await userService.getUsersHighscore();
  res.status(200).json(users);
 
}
const updateUserFavorites = async (req : any, res : any) =>{
  res.type("application/json");
  let user:User ={
    username:       req.body.email,
    password:       req.body.password, 
    avatarID:       1,
    highscore:      0,
    favorites:      req.body.favorites,
    blacklist:      []
  }

  await userService.updateFavorites(user);
  res.sendStatus(200);
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
  let foundUser:User|null = await userService.getUser(user.username);
  if (foundUser !== null) {
    return res.status(400).send({error: "something went wrong."});
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
  let userBasic:UserBasic[] = [];
  for(let i:number = 0; i<users.length; i++) {
    userBasic.push({
      username: users[i].username,
      avatarID: users[i].avatarID,
      highscore: users[i].highscore,
      favorites: users[i].favorites,
      blacklist: users[i].blacklist
    })
  }
  res.status(200).json(userBasic);
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
  getAllUsers, 
  updateUserFavorites
}