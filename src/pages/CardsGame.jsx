import Card from 'components/Card';
import styles from 'assets/style/cardsgame.module.scss';

const CardsGame = () => (
  <div className={styles.cards_game}>
    <div className={styles.wrapper}>
      <div className={styles.cards_container}>
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
        <Card />
      </div>
    </div>
  </div>
);

export default CardsGame;
