import * as jwt from "jsonwebtoken";
import { hash, salt } from "../auth/auth";
import userService from "../services/userService";
import { UserCredentials, User, UserBasic, TokenPayload, TokenPayloadDecoded } from "../types";

const signup = async (req: any, res: any) => {
  res.type("application/json");

  let password: string = req.body.password;
  let addedSalt = salt();

  let user: User = {
    username: req.body.email,
    password: `${addedSalt}.${hash(password, addedSalt)}`,
    avatarID: 1,
    highscore: 0,
    favorites: [],
    blacklist: []
  }
  let foundUser: User | null = await userService.getUser(user.username);
  if (foundUser !== null) {
    return res.status(400).send({ error: "User already exists." });
  }
  await userService.createUser(user);
  res.status(201).json(user);
}

const login = async (req: any, res: any) => {

  let password: string = req.body.password;

  let userCredentials: UserCredentials = {
    username: req.body.email,
    password: password
  }

  let foundUser: User | null = await userService.getUser(userCredentials.username);
  if (foundUser !== null) {
    let addedSalt:string = foundUser.password.substring(0, foundUser.password.indexOf("."));
    let hashedPass:string = hash(userCredentials.password, addedSalt);

    if (foundUser.password === `${addedSalt}.${hashedPass}`) {
      let payload:TokenPayload = {
        _id:      foundUser._id?.toString(),
        username: foundUser.username,
        avatarID: foundUser.avatarID
      }
      let token:string = "";
      if (process.env.JWT_SECRET) {
         token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "1h"});
      } else {
        console.log("Secretkey not found.");
      }
      
      let userBasic: UserBasic = {
        username: foundUser.username,
        avatarID: foundUser.avatarID,
        highscore: foundUser.highscore,
        favorites: foundUser.favorites,
        blacklist: foundUser.blacklist
      }
      res.cookie("jwt", token, {httpOnly: true, sameSite: "lax", secure: true});
      return res.status(200).json(userBasic);
    } else {
      return res.status(401).json({ "error": "credentials with wrong combination." })
    }

  }
  return res.status(404).json({ "error": "user does not exist." });
}

const authorize = async (req:any, res:any, next:any) => {
  let token:string = req.cookies.jwt;

  if (token === undefined) {
    return res.status(401).send();
  }
  try {
    jwt.verify(token, process.env.JWT_SECRET!);
    return next();

  } catch (err) {
    console.log(err);
    return res.status(403).send()
  }
}

export default {
  login,
  signup,
  authorize
}