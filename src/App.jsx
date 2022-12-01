import Home from 'components/Home';
import Register from 'components/Register';
import Game from 'pages/Game';
import { Route, Routes } from 'react-router-dom';
import GameRules from './pages/GameRules';

const App = () => (
  <Routes>
    <Route path='/' element={<Home/>} />
    <Route path='/register' element={<Register />}/>
    <Route path='/game/:gameId' element={<GameRules />}/>
    <Route path='/game/:gameId/play' element={<Game />}/>
  </Routes>
);

export default App;
