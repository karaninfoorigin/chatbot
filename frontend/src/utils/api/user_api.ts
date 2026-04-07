import api from "../axiosInstance";

export const fetchMe =async()=>{
    const res = await api.get("/auth/fetchMe");
    console.log(res.data)
    return res.data
}