import axios from "axios";

const BASE_URL = "https://6836b885664e72d28e41d28e.mockapi.io/api/register";

export const getAllExcuses = async () => {
  const response = await axios.get(BASE_URL);
  return response.data.filter((item) => item.role === "excuse");
};

export const submitExcuse = async (excuse) => {
  const response = await axios.post(BASE_URL, {
    ...excuse,
    role: "excuse",
    status: "pending",
  });
  return response.data;
};

export const acceptExcuse = async (id) => {
  const response = await axios.put(`${BASE_URL}/${id}`, {
    status: "accepted",
  });
  return response.data;
};

export const rejectExcuse = async (id) => {
  const response = await axios.put(`${BASE_URL}/${id}`, {
    status: "rejected",
  });
  return response.data;
};

export const deleteExcuse = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};
