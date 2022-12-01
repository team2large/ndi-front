import { useParams } from 'react-router-dom';
import styles from 'assets/style/home.module.scss';

const Game = () => {
  const { gameId } = useParams();

  return (
    <div className={styles.home}>
      <main>
        <header>
          <h1>Nom du jeu {gameId}</h1>
        </header>
      </main>
    </div>
  );
};

export default Game;
