import { Link } from 'react-router-dom';
import styles from 'assets/style/gamecard.module.scss';

const GameCard = ({
  id,
  slug,
  name,
  description,
  color,
}) => (
  <Link className={styles.game} key={id} style={{ backgroundColor: color }} to={`/games/${slug}`}>
    <img src={`/img/games/${slug}.png`} alt={`Illustration du jeu ${name}`} />
    <h3>{name}</h3>
    <p>{description}</p>
  </Link>
);

export default GameCard;
