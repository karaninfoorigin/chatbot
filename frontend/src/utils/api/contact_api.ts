import api from "../axiosInstance"

export interface AddContactPayload {
  owner_phone: string
  contact_phone: string
  saved_name?: string
}

export const addContact = async (data: AddContactPayload) => {
  const response = await api.post("/contacts/", data)
  return response.data
}

export const getContacts = async (owner_phone: string) => {
  const response = await api.get("/contacts/", {
    params: { owner_phone }
  })
  return response.data
}
