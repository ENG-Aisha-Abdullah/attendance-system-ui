import axios from "axios";

const BASE_URL = "https://6836b885664e72d28e41d28e.mockapi.io/api/register";

export const getAllClasses = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addClass = async (classData) => {
  const response = await axios.post(BASE_URL, classData);
  return response.data;
};

export const deleteClass = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};