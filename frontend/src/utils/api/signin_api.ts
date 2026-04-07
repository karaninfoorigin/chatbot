import api from "../axiosInstance";

interface data{
    phone : string
}

export const signin = async (data : data) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};