import axios from "axios";
import { Quote } from "../types";
import failsafeService from "./failsafeService";
import { UserBasic } from "../types";

const API_HEADER = { headers: { "Authorization": `Bearer ${process.env.API_TOKEN}` } }

// todo -> 10 or x random quotes excl. blacklisted bij user

const getQuotes = async (amountQuotes: number = 10, user?: UserBasic): Promise<Quote[]> => {
  let quotes: Quote[] = [];
  let data: Quote[] = [];

  try {
    let response = await axios.get(`${process.env.API_URL}/quote`, API_HEADER);

    if (response.status === 200) {
      data = await response.data.docs;
    }
  } catch (err) {
    console.log(`${err}: (quotes) fetching from db`);
    data = await failsafeService.getDbQuotes();
  }

  for (let i: number = 0; i < amountQuotes; i++) {
    let randomIndex: number = Math.floor(Math.random() * data.length );
    quotes.push(data[randomIndex]);
    data.splice(randomIndex, 1);
  }
  
  return quotes;
}

const getCharacterQuotes = async (id: string): Promise<Quote[]> => {
  let characterQuotes: Quote[] = [];

  try {
    let response = await axios.get(`${process.env.API_URL}/character/${id}/quote`, API_HEADER);

    if (response.status === 200) {
      characterQuotes = await response.data.docs;
    }
  } catch (err) {
    console.log(`${err}: (quotes) fetching from db`);
    characterQuotes = await failsafeService.getDbQuotes();
  }
  return characterQuotes;
}
export default {
  getQuotes,
  getCharacterQuotes
}