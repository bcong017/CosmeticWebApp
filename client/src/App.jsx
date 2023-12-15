import '@/Global_reference/App.css';
import { createContext } from 'react';
import Routing from './Routes';
export const Token = createContext();

function App() {
  return (
    <Token.Provider value='admin'>
      <div id='app-body'>
        <Routing />
      </div>
    </Token.Provider>
  );
}

export default App;
