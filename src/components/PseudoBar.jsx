import styles from 'assets/style/PseudoBar.module.scss';
import trash from 'assets/images/admin/trash.svg';

const PseudoBar = ({ username, gameId, score, onClick }) => (
  <div className={styles.bar}>
    <div className={styles.leaderboard}>
      <div className={styles.infosContainer}>
        <p className={styles.infos}>{username}</p>
      </div>
      <div className={styles.infosContainer}>
        <p className={styles.subTitle}>Le jeu</p>
        <p className={styles.infos}>#{gameId}</p>
      </div>
      <div className={styles.infosContainer}>
        <p className={styles.subTitle}>avec un score de </p>
        <p className={styles.infos}>{score} pts</p>
      </div>
      <div className={styles.trashContainer}>
        <p onClick={onClick}>Supprimer</p>
        <img src={trash} alt='trash' />
      </div>
    </div>
  </div>
);
export default PseudoBar;
