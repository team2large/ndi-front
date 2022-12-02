import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from 'context/AppContext';
import styles from 'assets/style/game.module.scss';

const Game = () => {
  const { currentGame, changeCurrentGame, gamesLoaded } = useContext(AppContext);
  const { gameId } = useParams();

  useEffect(() => {
    if (gamesLoaded)
      changeCurrentGame(gameId);
  }, [gamesLoaded]);

  return (
    <div className={styles.game}>
      <main>
        <header>
          {currentGame ? (
            <>
              <h1>{currentGame.name}</h1>
              <p>{currentGame.description}</p>
              <Link to={`/games/${currentGame.slug}/leaderboard`}>Leaderboard</Link>
            </>
          ) : (
            <h1>Game not found</h1>
          )}
        </header>
      </main>
    </div>
  );
};

export default Game;
