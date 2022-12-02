import { useEffect, useState } from 'react';
import cn from 'classnames';
import enemies from './enemies.json';
import styles from './istclicker.module.scss';

const DEATH_THRESHOLD = 20;


const Enemy = ({ onDeath, x = 50, y = 50 }) => {
  const [life, setLife] = useState(99 + Math.ceil(Math.random() * 60));
  const [enemy] = useState(enemies[Math.floor(Math.random() * enemies.length)]);
  const handleHit = () => {
    setLife((life) => life - 20);
  };

  const handleDeath = () => {
    // additional logic
    onDeath(enemy);
  };

  useEffect(() => {
    if (life <= DEATH_THRESHOLD)
      handleDeath();
  }, [life]);

  const classNames = cn(styles.eEnemy,
    {
      [styles.mHide]: life <= DEATH_THRESHOLD,
    });
  return (
    <div
      className={classNames}
      style={{ width: life + 50, height: life + 50, left: `${x}%`, top: `${y}%` }}
      onClick={handleHit}
    >
      <img draggable='false' src={`/img/games/ist_clicker/enemies/${enemy.asset}_nom.png`} alt={enemy.name}/>
    </div>
  );
};

export default Enemy;
