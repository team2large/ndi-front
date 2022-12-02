import { createContext, useEffect, useState } from 'react';
import api from 'api';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [gamesLoaded, setGamesLoaded] = useState(false);
  const [games, setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState({});
  const [currentScore, setCurrentScore] = useState(0);

  const palette = [
    '#0E5652',
    '#615518',
    '#1E1861',
    '#611818',
    '#e4c1f9'
  ];

  const changeCurrentGame = (id) => {
    setCurrentGame(games.find((game) => game.slug === id || game.id === parseInt(id)));
  };

  const setScore = (score) => {
    setCurrentGame({ ...currentGame, score });
  };

  const loadGames = () => {
    api.games.list().then((games) => {
      setGames(games);
      setGamesLoaded(true);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    loadGames();
  }, []);

  return (
    <AppContext.Provider value={{ gamesLoaded, games, currentGame, changeCurrentGame, loadGames, setScore, palette, currentScore, setCurrentScore }}>
      {children}
    </AppContext.Provider>
  );
};
