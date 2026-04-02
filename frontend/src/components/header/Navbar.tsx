import { useTheme } from "../../context/ThemeContext"
import { FaMoon, FaSun } from "react-icons/fa"

const Navbar = () => {
  const { setTheme, theme } = useTheme()

  const handleChangeTheme = () => {
    setTheme(theme === "light" ? "dark" : "light")
  }

  return (
    <div className="w-full flex items-center justify-end p-5 ">
      <button
        onClick={handleChangeTheme}
        className="flex items-center justify-center 
                   w-10 h-10 
                   sm:w-11 sm:h-11 
                   md:w-12 md:h-12 
                   rounded-full transition-all duration-300
                   hover:scale-110
                   animate-pulse
                   "
      >
        {theme === "light" ? (
          <FaMoon className="text-lg sm:text-xl md:text-2xl" />
        ) : (
          <FaSun className="text-lg sm:text-xl md:text-2xl" />
        )}
      </button>
    </div>
  )
}

export default Navbar