import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'context/AppContext';
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
    <div className={mainStyles.main}>
      <main>
        <header>
          {currentGame ? (
            <>
              <h1>Leaderboard {currentGame.name}</h1>
              <p>{currentGame.description}</p>
            </>
          ) : (
            <h1>Game not found</h1>
          )}
        </header>
        {/* Form with username and score */}
        <div className={styles.form}>
          <label htmlFor='username'>Username</label>
          <input type='text' id='username' value={username} onChange={(e) => setUsername(e.target.value)} />
          <label htmlFor='score'>Score</label>
          <input type='number' id='score' value={score} onChange={(e) => setScore(e.target.value)} />
          <button onClick={addScore}>Add score</button>
        </div>
        {leaderboard && (
          <table>
            <thead>
              <tr>
                <th>Rang</th>
                <th>Pseudo</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((item, index) => (
                <tr key={index}>
                  <td>#{index + 1}</td>
                  <td>{item.username}</td>
                  <td>{item.score}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Link to='/'>
          Homepage
        </Link>
      </main>
    </div>
  );
};

export default Leaderboard;
