import { createContext, useContext, useEffect, useState, type ReactNode } from "react"
import { fetchMe } from "../utils/api/user_api"
interface UserContextType {
  user: {
    id : number
    phone_number: string,

  } | null
  setUser: (user : {id:number, phone_number: string,} | null) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState< {
    id:number,
    phone_number: string,

  } | null>(null)
  useEffect(()=>{
    fetchMe().then((result)=>{
        setUser(result)
    });
   
  },[])
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (!context) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}