
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/header/Navbar'
import SignIn from './pages/Signin/SignIn'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/sign-in' element={
            <>
              <Navbar />
              <SignIn />
            </>
          } />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
