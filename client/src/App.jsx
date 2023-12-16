import '@/Global_reference/App.css';
import Routing from './Routes';
import { useContext } from 'react';
import { Token } from './main';
import NavBar from '@/Component/NavBar/NavBar';
import Footer from '@/Component/Footer/Footer';
function App() {
  const token = useContext(Token);
  return (
    <div id='app-body'>
      {token != 'admin' && <NavBar />}
      <Routing />
      {token != 'admin' && <Footer />}
    </div>
  );
}

export default App;
