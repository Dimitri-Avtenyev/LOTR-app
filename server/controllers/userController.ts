import userService from "../services/userService";

const getUsersHighscore = async (req:any, res:any) => {
  res.type("application/json");
  const  users  = await userService.getUsersHighscore();
  res.status(200).json(users);
 
}

const addUser = async (req:any, res:any) => {
  res.type("application/json");
  const user = await userService.createUser();
  res.status(200).json(user);
}

const addUserToHighscores = async (req:any, res:any) => {
  let username:string = req.body.username;
  let score:number = parseInt(req.body.score);
  
  await userService.addUserToHighscores({userName:username, score: score});

  res.sendStatus(200);

}

const emptyHighscoresCollection = async (req:any, res:any) => {
  await userService.emptyCollection();
  res.send("Collection deleted");
}
export default {
  getUsersHighscore,
  addUser,
  addUserToHighscores,
  emptyHighscoresCollection
}