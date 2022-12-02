import { useContext, useEffect, useState } from 'react';
import cn from 'classnames';
import { useNavigate, useParams } from 'react-router-dom';
import { AppContext } from '../../context/AppContext';
import styles from './istclicker.module.scss';
import enemies from './enemies.json';
import Enemy from './Enemy';

const gameStates = ['initialState', 'firstEnemy', 'playing', 'gameOver'];

const emptyKillBoard = {
  /* eslint-disable camelcase */
  chlamydiae: 0,
  hepatite_b: 0,
  gonorrhee: 0,
  gale: 0,
  herpes: 0,
  hpv: 0,
  morpion: 0,
  trichonomase: 0,
  vih: 0,
  herpes_genital: 0,
  /* eslint-enable camelcase */
};

const ISTClicker = () => {
  const [gameState, setGameState] = useState(gameStates[0]);
  const [starting, setStarting] = useState(false);
  const [enemy, setEnemy] = useState(null);
  const [remainingTime, setRemainingTime] = useState(45);
  const [timerIntervalId, setTimerIntervalId] = useState(-1);
  const [killBoard, setKillBoard] = useState(emptyKillBoard);
  const { setCurrentScore } = useContext(AppContext);
  const navigate = useNavigate();
  const { gameId } = useParams();

  useEffect(() => () => {
    clearInterval(timerIntervalId);
  }, []);

  const handleStart = () => {
    setStarting(true);
    setTimeout(() => {
      setStarting(false);
      setGameState('firstEnemy');
    }, 1500);
  };

  const handleEnemyDeath = (enemy) => {
    setKillBoard((killBoard) => ({
      ...killBoard,
      [enemy.asset]: (killBoard?.[enemy.asset] ?? 0) + 1,
    }));
    setEnemy(null);
  };

  const handleFirstEnemyDeath = () => {
    setTimeout(() => {
      setGameState('playing');
      setRemainingTime(45);
      setTimerIntervalId(setInterval(() => {
        setRemainingTime((remainingTime) => remainingTime - 1);
      }, 1000));
    }, 1000);
  };

  useEffect(() => {
    if (remainingTime <= 0) {
      clearInterval(timerIntervalId);
      setGameState('gameOver');
      setCurrentScore(Object.values(killBoard).reduce((acc, val) => acc + val, 0));
    }
  }, [remainingTime]);

  useEffect(() => {
    if (gameState === 'firstEnemy')
      setKillBoard(emptyKillBoard);
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing' && !enemy) {
      setEnemy(<Enemy
        onDeath={handleEnemyDeath}
        x={(Math.random() * 80) + 10}
        y={(Math.random() * 80) + 10} />);
    }
  }, [gameState, enemy]);
  return (
    <div className={styles.eGameWrapper}>

      {gameState === 'playing' && (<div className={cn(styles.eTimer, {
        [styles.mMid]: remainingTime <= 15 && remainingTime > 5,
        [styles.mLow]: remainingTime <= 5,
      })}>
        {remainingTime}
      </div>)}

      {gameState === 'initialState' && (
        <button onClick={handleStart} className={cn(styles.eButton, { [styles.mHide]: starting })}>Jouer</button>
      )}

      {gameState === 'firstEnemy' && (
        <Enemy onDeath={handleFirstEnemyDeath} center/>
      )}

      {gameState === 'playing' && enemy}

      {gameState === 'gameOver' && (
        <div className={styles.eEndGameScreen}>
          <div className={styles.eGameOverStats}>
            {enemies.map((e) => (
              <div key={e.asset} className={styles.eIstStatStack}>
                <img key={e.asset} src={`/img/games/ist_clicker/enemies/${e.asset}.png`} alt={e.name}/>
                <p>{e.name} : {killBoard[e.asset]}</p>
              </div>
            ))}
          </div>
          <div>
            <h3>Score : {Object.values(killBoard).reduce((acc, val) => acc + val, 0)}</h3>
            <button onClick={() => navigate(`/games/${gameId}/leaderboard`)}>Sauvegarder</button>
          </div>
        </div>
      )
      }
    </div>
  );
};

export default ISTClicker;
