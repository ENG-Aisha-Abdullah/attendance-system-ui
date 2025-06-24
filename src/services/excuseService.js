import axios from "axios";

const BASE_URL = "https://6836b885664e72d28e41d28e.mockapi.io/api/register";

export const getAllExcuses = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addExcuse = async (excuseData) => {
  const response = await axios.post(BASE_URL, excuseData);
  return response.data;
};

export const deleteExcuse = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};