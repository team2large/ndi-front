import Tilt from 'react-parallax-tilt';
import styles from 'assets/style/card.module.scss';

const Card = ({ data, onClick }) => {
  const handleClick = () => {
    data.clicked = !data.clicked;
    onClick(data);
  };

  console.log(data);

  return (
    <Tilt>
      <div className={styles.card} onClick={handleClick}>
        <div className={styles.card__inner}>
          <div className={styles.image}>
            <img src={`/img/condoms/${data.slug}.png`} alt='condom' />
          </div>
          <div className={styles.content}>
            <p>Date de péremption : {data.date.toLocaleDateString()}</p>
            <p>Taille : {data.size}</p>
            {data.isNorme && <p>Conforme à la réglementation européenne</p>}
            <p>Data : {data.clicked ? 'clicked' : 'not'}</p>
          </div>
        </div>
      </div>
    </Tilt>
  );
};

export default Card;
