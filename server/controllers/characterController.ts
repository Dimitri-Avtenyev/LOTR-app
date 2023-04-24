import characterService from "../services/characterService";
import quoteService from "../services/quoteService";
import { Character, Quote } from "../types";

const getCharacters = async (req:any, res:any) => {
  res.type("application/json");

  const characters:Character[] = await characterService.getCharacters();
  res.status(200).json(characters);
}

const getCharacter = async (req:any, res:any) => {
  res.type("application/json");

  let characterId:string = req.params.id;
  let characters:Character[] = await characterService.getCharacters();
  let character:Character = await characterService.getCharacter(characters, characterId);
  res.status(200).json(character);

}

const getCharacterQuotes = async (req:any, res:any) => {
  res.type("application/json");

  let characterId:string = req.params.id;
  let characterQuotes:Quote[] = await quoteService.getCharacterQuotes(characterId);

  res.status(200).json(characterQuotes);
}

export default {
  getCharacters,
  getCharacter,
  getCharacterQuotes
}