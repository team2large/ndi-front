import Home from 'components/Home';
import Register from 'components/Register';
import Game from 'pages/Game';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/register' element={<Register />}/>
    <Route path='/game/:gameId' element={<Game />}/>
  </Routes>
);

export default App;
