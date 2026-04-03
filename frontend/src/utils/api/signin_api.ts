import api from "../axiosInstance";

interface data{
    phone : string
}

export const signin = async (data : data) => {
  const res = await api.post("/signin", data);
  return res.data;
};