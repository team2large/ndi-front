import { BsFillTrashFill } from 'react-icons/bs';
import api from '../api';
import styles from 'assets/style/PseudoBar.module.scss';

const PseudoBar = ({ id, username, gameId, score, onClick }) => (
  <div className={styles.bar}>
    <div className={styles.leaderboard}>
      <p className={styles.pseudo}>{username}</p>
      <p className={styles.gameID}>{gameId}</p>
      <p className={styles.score}>{score}</p>
      <BsFillTrashFill className={styles.button} onClick={onClick}></BsFillTrashFill></div>
  </div>
);
export default PseudoBar;
