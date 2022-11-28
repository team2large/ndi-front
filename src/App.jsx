import Home from 'components/Home';
import Test from 'components/Test';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <Routes>
    <Route path='/' element={<Home/>}/>
    <Route path='/test' element={<Test/>}/>
  </Routes>
);

export default App;
