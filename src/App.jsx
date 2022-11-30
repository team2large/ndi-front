import Home from 'components/Home';
import Register from 'components/Register';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/register' element={<Register />}/>
  </Routes>
);

export default App;
