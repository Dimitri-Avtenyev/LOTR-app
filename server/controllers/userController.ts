import userService, { COLLECTION_HIGHSCORES, COLLECTION_USERS } from "../services/userService";
import { User, UserBasic } from "../types";

const getUserFavorites = async (req:any, res:any) => {
  let userId:string = req.params.id;
  let user:User|null = await userService.getUser(userId);
  return res.status(200).json({"test": "test"});
}

const getUsersHighscore = async (req:any, res:any) => {
  res.type("application/json");
  const  users  = await userService.getUsersHighscore();
  res.status(200).json(users);
 
}
const updateUser = async (req : any, res : any) =>{
  res.type("application/json");

  let user:User|null = await userService.getUser(req.body.username);
  
  if (user === null) {
    return res.status(400).send({error: "User not found."});
  }
  let updatedUser:UserBasic = {
    username:       user.username,
    avatarID:       req.body.avatarID ?? user.avatarID,
    highscore:      req.body.highscore ?? user.highscore,
    favorites:      req.body.favorites ?? user.favorites,
    blacklist:      req.body.blacklist ?? user.blacklist
  }
  await userService.updateUser(updatedUser);

  return res.sendStatus(200);
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
      username:   users[i].username,
      avatarID:   users[i].avatarID,
      highscore:  users[i].highscore,
      favorites:  users[i].favorites,
      blacklist:  users[i].blacklist
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
  getUserFavorites,
  getUsersHighscore,
  addUserToHighscores,
  emptyHighscoresCollection,
  emptyUsersCollection,
  getAllUsers, 
  updateUser
}