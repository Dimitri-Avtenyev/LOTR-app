import axios from "axios";
import { Character } from "../types";

const API_HEADER = { headers: { "Authorization": `Bearer ${process.env.API_TOKEN}` } };


const getCharacters = async () => {
  let characters: Character[] = [];
  let response = await axios.get(`${process.env.API_URL}/character`, API_HEADER);
  let data:Character[] = await response.data.docs;

  characters = data;

  return characters;
}

const getCharacter = async (characters:Character[], id:string) => {
  let foundCharacter:Character | null = characters.find(character => character._id === id) || null;
  if (foundCharacter === null) {
    throw "Character not found";
  }
  return foundCharacter;
}

export default {
  getCharacters,
  getCharacter
}