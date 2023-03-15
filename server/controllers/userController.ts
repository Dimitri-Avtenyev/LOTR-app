import userService from "../services/userService";

const getUsers = async (req:any, res:any) => {
  res.type("application/json");
  const  users  = await userService.getAllUsers();
  res.status(200).json(users);
}
const addUser = async (req:any, res:any) => {
  res.type("application/json");
  const user = await userService.createUser();
  res.status(200).json(user);
}
export default {
  getUsers,
  addUser
}