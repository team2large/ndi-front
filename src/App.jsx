
import CardsGame from 'pages/CardsGame';
import Home from 'components/Home';
import Register from 'components/Register';
import Leaderboard from 'pages/Leaderboard';
import { Route, Routes } from 'react-router-dom';
import GameRules from './pages/GameRules';

const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/register' element={<Register />} />
    <Route path='/games/:gameId' element={<GameRules />}/>
    <Route path='/games/:gameId/leaderboard' element={<Leaderboard />} />
    <Route path='/games/memory_capote/play' element={<CardsGame />} />
  </Routes>
);
export default App;
