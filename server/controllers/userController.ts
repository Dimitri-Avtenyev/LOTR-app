import { Request, Response } from "express";
import userService, { COLLECTION_USERS } from "../services/userService";
import { Blacklist, Favorite, TokenPayloadDecoded, User, UserBasic } from "../types";

const getUser = async (req:Request, res:Response): Promise<Response> => {

  let payload:TokenPayloadDecoded = req.body.payload;
  let user:User|null = await userService.getUser(payload.username);

  if (user === null) {
    return res.status(400).json({error: "User not found."});
  } else {
    let userBasic:UserBasic = {
      username: user.username,
      avatarID: user.avatarID,
      highscore: user.highscore
    }
    return res.status(200).json(userBasic);
  }
  
}

const getUserList = async (req: Request, res: Response): Promise<Response> => {
  let typeList:string = req.params.typelist;
  let payload: TokenPayloadDecoded = req.body.payload;
  let user: User | null = await userService.getUser(payload.username);

  if (user === null) {
    return res.status(400).send({ error: "User not found." });
  }
  if (typeList === "favorites") {
    return res.status(200).json(user.favorites);

  } else if (typeList === "blacklist" ) {
    return res.status(200).json(user.blacklist);
  }
  return res.status(400).json({error: "Wrong endpoint, try favorites or blacklist"});
}

const getUserHighscore = async (req: Request, res: Response): Promise<Response> => {
  let payload: TokenPayloadDecoded = req.body.payload;
  let user: User | null = await userService.getUser(payload.username);

  if(user === null) {
    return res.status(400).send({error: "Highscore not found"});
  } 
  console.log(user.highscore);
  return res.status(200).json(user.highscore);
}

const updateUser = async (req: Request, res: Response): Promise<Response> => {
  res.type("application/json");
  let payload: TokenPayloadDecoded = req.body.payload;
  let user: User | null = await userService.getUser(payload.username);

  if (user === null) {
    return res.status(400).send({ error: "User not found." });
  }
  let updatedUser: UserBasic = {
    username: user.username,
    avatarID: req.body.avatarID ?? user.avatarID,
    highscore: req.body.highscore ?? user.highscore
  }
  await userService.updateUser(updatedUser);

  return res.sendStatus(200);
}

const updateBlacklistItem = async(req:Request, res:Response):Promise<Response> => {
  res.type("application/json");

  let payload: TokenPayloadDecoded = req.body.payload;
  let user: User | null = await userService.getUser(payload.username);
  let blacklistQuoteId:string = req.params.id;
  let blacklistReason:string = req.body.blacklistreason;

  if (user === null) {
    return res.status(400).send({ error: "User not found." });
  }
  await userService.updateBlacklistItem(payload._id, blacklistQuoteId, blacklistReason);
  
  return res.status(200).send({message : "reason for blacklisting updated successfully."});
}

const getAllUsers = async (req: Request, res: Response): Promise<Response> => {
  res.type("application/json");
  const users = await userService.getAllUsers();
  let userBasic: UserBasic[] = [];

  for (let i: number = 0; i < users.length; i++) {
    userBasic.push({
      username: users[i].username,
      avatarID: users[i].avatarID,
      highscore: users[i].highscore,
      favorites: users[i].favorites,
      blacklist: users[i].blacklist
    })
  }
  return res.status(200).json(userBasic);
}
const addListItem = async (req:Request, res:Response):Promise<Response> => {
  let typeList:string = req.params.typelist;
  let id:string = req.params.id;
  let typeItem:Favorite|Blacklist = req.body.typeitem;
  let payload: TokenPayloadDecoded = req.body.payload;

  if (id !== undefined) {
    await userService.addItemToUserList(payload._id, typeList, typeItem);
    return res.status(200).send(`item ${id} added.`)
  }
  return res.status(400).send(`item ${id} not found.`)

}
const deleteListItem = async (req:Request, res:Response): Promise<Response> => {
  let typeList:string = req.params.typelist;
  let id:string = req.params.id;
  let payload: TokenPayloadDecoded = req.body.payload;
  
  if (id !== undefined) {
    await userService.deleteItemFromUserList(payload._id, typeList, id);
    return res.status(200).send(`item ${id} deleted.`);
  }
  return res.status(400).send(`item ${id} not found.`)

}
const emptyUsersCollection = async (req: Request, res: Response): Promise<Response> => {
  await userService.emptyCollection(COLLECTION_USERS);
  return res.status(200).send("Collection deleted");
}
export default {
  getUser,
  getUserList,
  getUserHighscore,
  emptyUsersCollection,
  getAllUsers,
  updateUser,
  updateBlacklistItem,
  addListItem,
  deleteListItem
}