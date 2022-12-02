import Home from 'components/Home';
import Register from 'components/Register';
import Leaderboard from 'pages/Leaderboard';
import Game from 'pages/Game';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/register' element={<Register />} />
    <Route path='/games/:gameId' element={<Game />} />
    <Route path='/games/:gameId/leaderboard' element={<Leaderboard />} />
  </Routes>
);

export default App;
