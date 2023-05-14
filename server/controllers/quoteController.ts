import { Request, Response } from "express";
import quoteService from "../services/quoteService";
import { User } from "../types";
import userService from "../services/userService";

const getQuotes = async (req:Request, res:Response):Promise<Response> => {
  res.type("application/json");
  const quotes = await quoteService.getQuotes();
  // pass on blacklist from user

  return res.status(200).json(quotes);
}

export default {
  getQuotes
}