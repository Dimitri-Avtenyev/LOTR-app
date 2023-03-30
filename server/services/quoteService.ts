import axios from "axios";
import { Quote } from "../types";

const API_HEADER = { headers: { "Authorization": `Bearer ${process.env.API_TOKEN}` } }

// get 10 or x random quotes
// todo -> 10 or x random quotes excl. blacklisted bij user

const getQuotes = async (amountQuotes:number = 10) => {
  let quotes: Quote[] = [];
  let response = await axios.get(`${process.env.API_URL}/quote?limit=2384`, API_HEADER);
  let data: Quote[] = await response.data.docs;

  for (let i: number = 0; i < amountQuotes; i++) {
    let randomIndex: number = Math.floor(Math.random() * data.length) + 1;

    if (!quotes.find(quote => quote.id === data[randomIndex].id)) {
      quotes.push(data[randomIndex]);
    }

  }
  return quotes;
}


export default {
  getQuotes
}