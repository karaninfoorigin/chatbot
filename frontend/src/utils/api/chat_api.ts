import api from "../axiosInstance"

export const getChats = async (user_phone: string) => {
  const response = await api.get("/chats/", {
    params: { user_phone }
  })
  return response.data
}
