import { BrowserRouter, Route, Routes } from 'react-router-dom'
import "bootstrap/dist/css/bootstrap.min.css";  
import "bootstrap/dist/js/bootstrap.min.js";  
import './App.css'
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Home from './pages/Home/Home';
import Movies from "./pages/Movies/Movies"
import TvShows from "./pages/Tvshows/TvShows"
import Details from './pages/Detail/Details';
import ComingSoon from './pages/ComingSoon/ComingSoon';
import SearchPage from './pages/Search/SearchPage';
import Errorpage from './pages/Error/Errorpage';
import Login from './pages/Login/Login';
import Register from './pages/Login/Register';

function App() {
  return (

    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/movies' element={<Movies/>}/>
        <Route path='/tvshows' element={<TvShows/>}/>
        <Route path="/details/:id" element={<Details/>}/>
        <Route path='/comingsoon' element={<ComingSoon/>}/>
        <Route path='/searchpage' element={<SearchPage/>}/>
        <Route path='/error' element={<Errorpage/>}/>
        <Route path='/auth/login' element={<Login/>}/>
        <Route path='/auth/register' element={<Register/>}/>
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
