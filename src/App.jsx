import Home from 'components/Home';
import Register from 'components/Register';
import { Route, Routes } from 'react-router-dom';
import Admin from './pages/Admin';

const App = () => (
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register />}/>
    <Route path='/admin' element={<Admin />}/>
  </Routes>
);

export default App;
