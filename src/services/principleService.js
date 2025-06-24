import axios from "axios";

const API = "https://6836b885664e72d28e41d28e.mockapi.io/api/register";

export const getAllPrinciples = async () => {
  const res = await axios.get(`${API}`);
  return res.data.filter((item) => item.role === "principle");
};

export const addPrinciple = async (data) => {
  const res = await axios.post(`${API}`, { ...data, role: "principle" });
  return res.data;
};

export const deletePrinciple = async (id) => {
  await axios.delete(`${API}/${id}`);
};