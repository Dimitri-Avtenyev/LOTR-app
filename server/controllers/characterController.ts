import characterService from "../services/characterService";

const getCharacters = async (req:any, res:any) => {
  res.type("application/json");
  const characters = await characterService.getCharacters();
  res.status(200).json(characters);
}
export default {
  getCharacters
}