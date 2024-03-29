import * as jwt from "jsonwebtoken";
import { hash, salt } from "../auth/auth";
import userService from "../services/userService";
import { UserCredentials, User, UserBasic, TokenPayload, TokenPayloadDecoded } from "../types";
import { NextFunction, Request, Response } from "express";

const signup = async (req: Request, res: Response):Promise<Response> => {
  res.type("application/json");

  let password: string = req.body.password;
  let addedSalt: string = salt();

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
  return res.status(201).json(user);
}

const login = async (req: Request, res: Response):Promise<Response> => {

  let password: string = req.body.password;

  let userCredentials: UserCredentials = {
    username: req.body.email,
    password: password
  }

  let foundUser: User | null = await userService.getUser(userCredentials.username);
  if (foundUser !== null) {
    let addedSalt:string = foundUser.password.substring(0, foundUser.password.indexOf("."));
    let hashedPass:string = hash(userCredentials.password, addedSalt);

    if (foundUser.password === `${addedSalt}.${hashedPass}` && foundUser._id) {
      let payload:TokenPayload = {
        _id:      foundUser._id.toString(),
        username: foundUser.username,
        avatarID: foundUser.avatarID
      }
      let token:string = "";
      if (process.env.JWT_SECRET) {
         token = jwt.sign(payload, process.env.JWT_SECRET, {expiresIn: "4h"});
      } else {
        console.log("Secretkey not found.");
      }
  
      if(process.env.NODE_ENV === "development") {
        res.cookie("jwt", token, {httpOnly:true, sameSite:"none", secure: true, domain: "localhost"});
      } else {
        res.cookie("jwt", token, {httpOnly:true, sameSite:"lax", secure: true, domain: `${process.env.CLIENT_DOMAIN}`});
      }
      return res.status(200).json({"message": "login successful"});
    } else {
      return res.status(401).json({ "error": "credentials with wrong combination." })
    }
  }
  return res.status(404).json({ "error": "user does not exist." });
}

const authorize = async (req:Request, res:Response, next:NextFunction):Promise<void | Response> => {
  let token:string = req.cookies.jwt;
  
  if (token === undefined) {
    return res.status(401).send();
  }
  try {
    let payload:TokenPayloadDecoded = jwt.verify(token, process.env.JWT_SECRET!) as TokenPayloadDecoded;
    req.body.payload = payload;
    return next();

  } catch (err) {
    console.log(`${err}`);
    return res.status(403).send()
  }
}

export default {
  login,
  signup,
  authorize
}