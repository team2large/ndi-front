import styles from 'assets/style/PseudoBar.module.scss';

const PseudoBar = ({ username, gameId, score, onClick }) => (
  <div className={styles.bar}>
    <div className={styles.leaderboard}>
      <p className={styles.pseudo}>{username}</p>
      <p className={styles.gameID}>{gameId}</p>
      <p className={styles.score}>{score}</p>
      <p onClick={onClick}>[DELETE]</p>
    </div>
  </div>
);
export default PseudoBar;
