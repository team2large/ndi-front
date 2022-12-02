import { Link, useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from 'context/AppContext';
import { ISTClicker, Morpion } from '../games';
import styles from 'assets/style/game.module.scss';


const GameComponents = {
  /* eslint-disable camelcase */
  ist_clicker: ISTClicker,
  morpion: Morpion,
  /* eslint-enable camelcase */
};

const Game = () => {
  const { currentGame, changeCurrentGame, gamesLoaded } = useContext(AppContext);
  const { gameId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!gameId || !(gameId in GameComponents))
      navigate('/');
  }, [gameId]);

  const GameComponent = GameComponents[gameId];

  useEffect(() => {
    if (gamesLoaded)
      changeCurrentGame(gameId);
  }, [gamesLoaded]);

  return (
    <div className={styles.game}>
      <main>
        <header className={styles.header}>
          {currentGame ? (
            <>
              <h1 >{currentGame.name}</h1>
              <p>{currentGame.description}</p>
              <Link to={`/games/${currentGame.slug}/leaderboard`}>Leaderboard</Link>
            </>
          ) : (
            <h1>Game not found</h1>
          )}
        </header>
        <section id='game-frame'>
          <GameComponent />
        </section>
      </main>
    </div>
  );
};

export default Game;
