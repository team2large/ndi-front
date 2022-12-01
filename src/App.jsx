import CardsGame from 'pages/CardsGame';
import { Route, Routes } from 'react-router-dom';

const App = () => (
  <Routes>
    <Route path='/' element={<CardsGame />} />
  </Routes>
);

export default App;
