import { dbClient } from "../server"
import { Character, Movie, Quote } from "../types";

const DB_NAME: string = "LOTR-app";
const COLLECTION_CHARACTERS: string = "Characters";
const COLLECTION_MOVIES: string = "Movies";
const COLLECTION_QUOTES: string = "Quotes";

const getDbCharacters = async ():Promise<Character[]> => {
  let characters:Character[] = [];
  try {
    await dbClient.connect();
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_CHARACTERS).find<Character>({})
    characters = await cursor.toArray();

  } catch (err) {
    console.log(err);
  } finally {
    setTimeout(async () => {
      await dbClient.close();
    }, 5000)
  }
  return characters;
}

const populateDbCharacters = async (characters:Character[]) => {
  try {
    await dbClient.connect();
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_CHARACTERS).find<Character>({});
    let charactersDb = await cursor.toArray();

    if (charactersDb.length === 0) {
      await dbClient.db(DB_NAME).collection(COLLECTION_CHARACTERS).insertMany(characters);
    }
  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
}

const getDbMovies = async ():Promise<Movie[]> => {
  let movies:Movie[] = [];
  try {
    await dbClient.connect();
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_MOVIES).find<Movie>({})
    movies = await cursor.toArray();
  } catch (err) {
    console.log(err);
  } finally {
    setTimeout(async () => {
      await dbClient.close();
    }, 5000)
  }
  return movies;
}

const populateDbMovies = async (movies:Movie[]) => {
  try {
    await dbClient.connect();
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_MOVIES).find<Movie>({});
    let moviesDb = await cursor.toArray();

    if (moviesDb.length === 0) {
      await dbClient.db(DB_NAME).collection(COLLECTION_MOVIES).insertMany(movies)
    }
  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
}

const getDbQuotes = async ():Promise<Quote[]> => {
  let quotes:Quote[] = [];
  try {
    await dbClient.connect();
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_QUOTES).find<Quote>({})
    quotes = await cursor.toArray();
  } catch (err) {
    console.log(err);
  } finally {
    setTimeout(async () => {
      await dbClient.close();
    }, 5000)
  }
  return quotes;
}

const populateDbQuotes = async (quotes:Quote[]) => {
  try {
    await dbClient.connect();
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_QUOTES).find<Quote>({});
    let quotesDb = await cursor.toArray();
    //await dbClient.db(DB_NAME).collection(COLLECTION_QUOTES).deleteMany({});
    if (quotesDb.length === 0) {
      await dbClient.db(DB_NAME).collection(COLLECTION_QUOTES).insertMany(quotes); 
    }
  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
}


export default {
  getDbCharacters,
  populateDbCharacters,

  getDbMovies,
  populateDbMovies,

  getDbQuotes,
  populateDbQuotes
}