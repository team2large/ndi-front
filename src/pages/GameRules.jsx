import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AppContext } from 'context/AppContext';
import styles from 'assets/style/gamerules.module.scss';
import playButton from 'assets/images/gamerules/playButton.png';

const GameRules = () => {
  const { currentGame, changeCurrentGame, gamesLoaded } = useContext(AppContext);
  const { gameId } = useParams();

  useEffect(() => {
    if (gamesLoaded)
      changeCurrentGame(gameId);
  }, [gamesLoaded]);

  return (
    <div className={styles.home}>
      <main className={'container'}>
        <div><img src={`/img/rules/${currentGame.slug}.png`} alt='Règles du jeu courant' /></div>
        <div><Link to={`/games/${currentGame.slug}/play`}>Jouer au jeu <img src={playButton} width={30} height={30} alt='Lancer le jeu' /></Link></div>
      </main>
    </div>
  );
};

export default GameRules;
