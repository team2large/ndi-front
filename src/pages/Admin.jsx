import { useEffect } from 'react';
import PseudoBar from '../components/PseudoBar';
import styles from 'assets/style/Admin.module.scss';
const Admin = () => {
  const names = [
    {
      username: 'coucou',
      gameID: 'yruv',
      score: 10,
    },
    {
      username: 'coucou',
      gameID: 'yruv',
      score: 10,
    },
    {
      username: 'coucou',
      gameID: 'yruv',
      score: 10,
    },
    {
      username: 'coucou',
      gameID: 'yruv',
      score: 10,
    },
    {
      username: 'coucou',
      gameID: 'yruv',
      score: 10,
    },
    {
      username: 'coucou',
      gameID: 'yruv',
      score: 10,
    }
  ];
  return (
    <main className={styles.background}>
      <div className={styles.wrapper}>
        {names.map((pseudos) => <PseudoBar key={Date.now()} pseudo={pseudos.username} gameID={pseudos.gameID} score={pseudos.score}/>
        )}
      </div>
    </main>
  );
};
export default Admin;
