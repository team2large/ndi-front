import Tilt from 'react-parallax-tilt';
import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import styles from 'assets/style/card.module.scss';

const Card = ({ data, onClick }) => {
  const { palette } = useContext(AppContext);

  return (
    <Tilt>
      <div
        className={styles.card}
        style={data.clicked ? { border: '3px solid purple', boxShadow: '0 0 50px purple' } : { border: `3px solid ${palette[0]}${55}` }}
        onClick={onClick}
      >
        <div className={styles.card__inner}>
          <div className={styles.image}>
            <img src={`/img/condoms/${data.slug}.png`} alt='condom' />
          </div>
          <div className={styles.content}>
            <p>
              Date de péremption : {data.date.toLocaleDateString()}
            </p>
            <p>Taille : {data.size}</p>
            {data.isNorme && (
              <p>Conforme à la réglementation européenne</p>
            )}
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
