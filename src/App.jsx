import CardsGame from 'pages/CardsGame';
import Home from 'pages/Home';
import Register from 'components/Register';
import Leaderboard from 'pages/Leaderboard';
import { Route, Routes } from 'react-router-dom';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import GameRules from './pages/GameRules';
import Admin from './pages/Admin';
import Game from './pages/Game';
import AdminAuth from './pages/AdminAuth';
import DepisteurGame from './pages/DepisteurGame';

const App = () => (
  <Routes>
    <Route path='/' element={<DndProvider backend={HTML5Backend}><Home /></DndProvider>} />
    <Route path='/register' element={<Register />} />
    <Route path='/games/:gameId' element={<GameRules />}/>
    <Route path='/games/:gameId/play' element={<Game />} />
    <Route path='/games/:gameId/leaderboard' element={<Leaderboard />} />
    <Route path='/games/memory_capote/play' element={<CardsGame />} />
    <Route path='/admin' element={<Admin />} />
    <Route path='/admin/login' element={<AdminAuth />} />
    <Route path='/games/depisteur/play' element={<DepisteurGame />} />
  </Routes>

);
export default App;
