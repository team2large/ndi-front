import Tilt from 'react-parallax-tilt';
import styles from 'assets/style/card.module.scss';

const Card = ({ data, onClick }) => {
  const borderColor = data.isValid ? '#3FCA90' : '#FF5D47';

  return (
    <Tilt>
      <div
        className={styles.card}
        style={data.clicked ? { border: `5px solid ${borderColor}`, boxShadow: `0 0 50px ${borderColor}` } : { border: '5px solid #5B5D82', boxShadow: '0 0 50px #5B5D82' }}
        onClick={!data.clicked && onClick}
      >
        <div className={styles.card__inner}>
          <div className={styles.image}>
            <img src={`/img/condoms/${data.slug}.png`} alt='condom' />
          </div>
          <div className={styles.content}>
            <p>
              Date de péremption : {data.date}
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
