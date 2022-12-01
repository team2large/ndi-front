import Tilt from 'react-parallax-tilt';
import styles from 'assets/style/card.module.scss';

const Card = () => {
  const isNorme = true;
  const taille = 'XXXL';
  const date = new Date();

  return (
    <Tilt>
      <div className={styles.card}>
        <div className={styles.card__inner}>
          <div className={styles.image}></div>
          <div className={styles.content}>
            <p>Date de péremption : {date.toLocaleDateString()}</p>
            <p>Taille : {taille}</p>
            {isNorme && <p>Conforme à la réglementation européenne</p>}
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
