import axios from "axios";
import failsafeService from "./failsafeService";
import { Character } from "../types";
import { dbClient } from "../server";

const API_HEADER = { headers: { "Authorization": `Bearer ${process.env.API_TOKEN}` } };

const DB_NAME: string = "LOTR-app";
const COLLECTION_CHARACTERS: string = "Characters";

const getCharacters = async () => {
  let characters: Character[] = [];
  
  try {
    let response = await axios.get(`${process.env.API_URL}/character`, API_HEADER);

    if (response.status === 200) {
      characters = await response.data.docs;
      await failsafeService.populateDbCharacters(characters);
    }
  } catch (err) {
    console.log(`${err}: (characters) fetching from db`);
    characters = await failsafeService.getDbCharacters();
  }

  return characters;
}

const getDbCharacters = async () => {
  let characters: Character[] = [];
  try {
    await dbClient.connect();
    let cursor = await dbClient.db(DB_NAME).collection(COLLECTION_CHARACTERS).find<Character>({})
    characters = await cursor.toArray();

  } catch (err) {
    console.log(err);
  } finally {
    await dbClient.close();
  }
  return characters;
}

const getCharacter = async (characters: Character[], id: string) => {
  let foundCharacter: Character | null = characters.find(character => character._id.toString() === id) || null;
  if (foundCharacter === null) {
    throw "Character not found";
  }
  return foundCharacter;
}

export default {
  getCharacters,
  getCharacter,
  getDbCharacters
}