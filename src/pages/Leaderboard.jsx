import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'context/AppContext';
import arrow from '../assets/images/gamerules/playButton.png';
import api from 'api';
import styles from 'assets/style/leaderboard.module.scss';
import mainStyles from 'assets/style/main.module.scss';

const Leaderboard = () => {
  const { currentGame, changeCurrentGame, gamesLoaded, currentScore } = useContext(AppContext);
  const { gameId } = useParams();
  const [leaderboard, setLeaderboard] = useState(null);

  const [username, setUsername] = useState('');
  const [score, setScore] = useState(currentScore);

  const loadLeaderboard = () => {
    api.games.scores(gameId).then((data) => {
      setLeaderboard(data);
    }).catch((error) => {
      console.log(error);
      setLeaderboard([
        {
          id: 1,
          username: 'Toto',
          score: 100,
        },
        {
          id: 2,
          username: 'Titi',
          score: 50,
        },
        {
          id: 3,
          username: 'Tata',
          score: 25,
        }
      ]);
    });
  };

  const addScore = () => {
    if (username.length > 0 && parseInt(score) > 0) {
      api.games.addScore(gameId, username, parseInt(score))
        .then((addScoreResult) => {
          console.log(addScoreResult);
          loadLeaderboard();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (gamesLoaded)
      changeCurrentGame(gameId);
  }, [gamesLoaded]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <main className={styles.wrapper}>
      {currentGame ? (
        <>
          <header className={styles.name}>{currentGame.name}</header>
          <p className={styles.description}> Vous trouverez ici le classement du jeu  {currentGame.name}</p>
        </>
      ) : (
        <header className={styles.name}> Jeu non trouvé</header>
      )}
      <p className={styles.leaderboardName}>Leaderboard</p>
      { leaderboard && leaderboard.map((item, index) => (
        <div key={index} className={styles.leaderboard}>
          <p className={styles.ranking}>#{index + 1}</p>
          <p className={styles.user}>{item?.username}</p>
          <p className={styles.score}>{item?.score}</p>
        </div>
      ))}
      <Link className={styles.bottomContent} to={'/'}>
        <img src={arrow} />
        <p>Accueil</p>
      </Link>

    </main>
  );
};
export default Leaderboard;
