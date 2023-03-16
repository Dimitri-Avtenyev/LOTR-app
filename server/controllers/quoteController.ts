import quoteService from "../services/quoteService";

const getQuotes = async (req:any, res:any) => {
  res.type("application/json");
  const quotes = await quoteService.getQuotes();
  res.status(200).json(quotes);
}

export default {
  getQuotes
}