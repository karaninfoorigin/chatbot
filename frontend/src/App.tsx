
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/header/Navbar'
import SignIn from './pages/Signin/SignIn'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Homepage from './pages/homepage/Homepage';
function App() {

  return (
    <>
     <ToastContainer position="top-right" autoClose={3000} />
      <BrowserRouter>
        <Routes>
         <Route path='/' element={<Homepage/>}/>
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
