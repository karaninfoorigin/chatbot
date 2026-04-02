import { createRoot } from 'react-dom/client'
import "../src/styles/global.css"
import App from './App.tsx'
import { ThemeProvider } from './context/ThemeContext.tsx'

createRoot(document.getElementById('root')!).render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
    
  ,
)
