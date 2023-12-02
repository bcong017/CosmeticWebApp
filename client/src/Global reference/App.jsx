import { Routes, Route } from 'react-router-dom';
import HomePage from '../Pages/HomePage';
import ItemPage from '../Pages/ItemPage';
import CartPage from '../Pages/CartPage';
import NavBar from '../Component/NavBar/NavBar.jsx';
import Footer from '../Component/Footer/Footer.jsx';
import './App.css';

function App() {
  return (
    <div id='app-body'>
      <NavBar></NavBar>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/item' element={<ItemPage />} />
        <Route path='/cart' element={<CartPage />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
