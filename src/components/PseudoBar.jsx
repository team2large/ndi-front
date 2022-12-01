import DeleteIcon from '@mui/icons-material/Delete';
import styles from 'assets/style/PseudoBar.module.scss';
const PseudoBar = ({ pseudo, gameID, score }) => (
  <div className={styles.bar}>
    <div className={styles.leaderboard}>
      <div>{pseudo}</div>
      <div>{gameID}</div>
      <div>{score}</div>
      <DeleteIcon className={styles.button}></DeleteIcon></div>
  </div>
);
export default PseudoBar;
