import axios from "axios";

const BASE_URL = "https://6836b885664e72d28e41d28e.mockapi.io/api/register";

export const getAllStudents = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addStudent = async (student) => {
  const response = await axios.post(BASE_URL, student);
  return response.data;
};

export const deleteStudent = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
