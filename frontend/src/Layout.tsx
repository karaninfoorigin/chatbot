import { Outlet } from "react-router-dom"
import Navbar from "./components/header/Navbar"

export default function Layout() {
  return (
    <div className="h-full flex flex-col">
      <Navbar />

      {/* THIS IS IMPORTANT */}
      <div className="flex-1 flex overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}