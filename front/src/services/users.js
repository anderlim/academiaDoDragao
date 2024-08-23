import axios from "axios";
const baseUrl = "http://127.0.0.1:3003/api/users";

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const addUser = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default { getAll, addUser };
