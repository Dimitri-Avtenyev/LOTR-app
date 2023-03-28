import axios from "axios";
import { Quote } from "../types";

const API_HEADER = { headers: { "Authorization": `Bearer ${process.env.API_TOKEN}` } }

// get 10 random quotes
// todo -> 10 random quotes excl. blacklisted bij user

// API calls ->
// Quotes -> movies -> characters -> 3 calls / quiz
const getQuotes = async () => {
  let quotes: Quote[] = [];
  let response = await axios.get(`${process.env.API_URL}/quote?limit=2384`, API_HEADER);
  let data: Quote[] = await response.data.docs;

  for (let i: number = 0; i < 10; i++) {
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