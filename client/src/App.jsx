import { Routes, Route } from 'react-router-dom';
import HomePage from '@/Pages/HomePage';
import ItemPage from '@/Pages/ItemPage';
import CartPage from '@/Pages/CartPage';
import NavBar from '@/Component/NavBar/NavBar.jsx';
import Footer from '@/Component/Footer/Footer.jsx';
import '@/Global_reference/App.css';
import UserInfoPage from '@/Pages/UserInfoPage';
import CategoryPage from '@/Pages/CategoryPage';
import AdminPage from '@/Pages/AdminPage';
function App() {
  return (
    <div id='app-body'>
      <NavBar></NavBar>

      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/item' element={<ItemPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/userInfo' element={<UserInfoPage />} />
        <Route path='/category' element={<CategoryPage />} />
        <Route path='/admin' element={<AdminPage />} />
      </Routes>

      <Footer></Footer>
    </div>
  );
}

export default App;
