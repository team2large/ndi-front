import Home from 'pages/Home';
import Register from 'components/Register';
import Leaderboard from 'pages/Leaderboard';
import { Route, Routes } from 'react-router-dom';
import GameRules from './pages/GameRules';
import Admin from './pages/Admin';
import Game from './pages/Game';
import AdminAuth from './pages/AdminAuth';

const App = () => (
  <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/register' element={<Register />} />
    <Route path='/games/:gameId' element={<GameRules />}/>
    <Route path='/games/:gameId/play' element={<Game />} />
    <Route path='/games/:gameId/leaderboard' element={<Leaderboard />} />
    <Route path='/admin' element={<Admin />} />
    <Route path='/admin/login' element={<AdminAuth />} />
  </Routes>
);
export default App;
