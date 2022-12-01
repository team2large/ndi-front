import React, { useEffect, useState } from 'react';
import Card from 'components/Card';
import styles from 'assets/style/cardsgame.module.scss';

const CardsGame = () => {
  const ATTEMPT_MAX = 3;

  const [score, setScore] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [isWin, setIsWin] = useState(false);

  useEffect(() => {
    if (attempt === ATTEMPT_MAX) {
      setIsWin(false);
      setScore(0);
    } else if (isWin)
      setScore(ATTEMPT_MAX - attempt);
  }, [attempt]);

  return (
    <div className={styles.cards_game}>
      <div className={styles.wrapper}>
        <div className={styles.cards_container}>
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
          <Card />
        </div>
      </div>
    </div>
  );
};

export default CardsGame;
