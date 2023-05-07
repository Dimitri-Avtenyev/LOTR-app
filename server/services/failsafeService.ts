import axios from "axios";
import { dbClient } from "../db";
import { Character, Movie, Quote } from "../types";

const API_HEADER = { headers: { "Authorization": `Bearer ${process.env.API_TOKEN}` } };

const DB_NAME: string = "LOTR-app";
const COLLECTION_CHARACTERS: string = "Characters";
const COLLECTION_MOVIES: string = "Movies";
const COLLECTION_QUOTES: string = "Quotes";

const getDbCharacters = async ():Promise<Character[]> => {
  let characters:Character[] = [];
  try {
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_CHARACTERS).find<Character>({})
    characters = await cursor.toArray();

  } catch (err) {
    console.log(err);
  } 
  return characters;
}

const populateDbCharacters = async (characters:Character[]):Promise<void> => {
  try {
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_CHARACTERS).find<Character>({});
    let charactersDb = await cursor.toArray();

    if (charactersDb.length === 0) {
      await dbClient.db(DB_NAME).collection(COLLECTION_CHARACTERS).insertMany(characters);
    }
  } catch (err) {
    console.log(err);
  } 
}

const getDbMovies = async ():Promise<Movie[]> => {
  let movies:Movie[] = [];
  try {
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_MOVIES).find<Movie>({})
    movies = await cursor.toArray();
  } catch (err) {
    console.log(err);
  }
  return movies;
}

const populateDbMovies = async (movies:Movie[]):Promise<void> => {
  try {
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_MOVIES).find<Movie>({});
    let moviesDb = await cursor.toArray();

    if (moviesDb.length === 0) {
      await dbClient.db(DB_NAME).collection(COLLECTION_MOVIES).insertMany(movies)
    }
  } catch (err) {
    console.log(err);
  } 
}

const getDbQuotes = async ():Promise<Quote[]> => {
  let quotes:Quote[] = [];
  try {
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_QUOTES).find<Quote>({})
    quotes = await cursor.toArray();
  } catch (err) {
    console.log(err);
  } 
  return quotes;
}

const populateDbQuotes = async (quotes:Quote[]):Promise<void> => {
  try {
    
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_QUOTES).find<Quote>({});
    let quotesDb = await cursor.toArray();

    if (quotesDb.length === 0) {
      console.log("populating db");
      await dbClient.db(DB_NAME).collection(COLLECTION_QUOTES).insertMany(quotes); 
    }
  } catch (err) {
    console.log(err);
  } 
}
const populateDb = async():Promise<void> => {
  
  let [responseCharacters, responseMovies, responseQuotes] = await Promise.all([
    axios.get(`${process.env.API_URL}/character`, API_HEADER), 
    axios.get(`${process.env.API_URL}/movie`, API_HEADER),
    axios.get(`${process.env.API_URL}/quote`, API_HEADER)
  ]);
  let [characters, movies, quotes] = await Promise.all([
    responseCharacters.data.docs,
    responseMovies.data.docs,
    responseQuotes.data.docs
  ]);

  await Promise.all([
    populateDbCharacters(characters),
    populateDbMovies(movies),
    populateDbQuotes(quotes)
  ]);
}
export default {
  populateDb,

  getDbCharacters,
  populateDbCharacters,

  getDbMovies,
  populateDbMovies,

  getDbQuotes,
  populateDbQuotes
}