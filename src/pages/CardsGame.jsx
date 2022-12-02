
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Card from 'components/Card';
import styles from 'assets/style/cardsgame.module.scss';
import dataCondoms from 'components/condoms.json';

const CardsGame = () => {
  const ATTEMPT_MAX = 3;
  const NBR_CARDS = 9;

  const [score, setScore] = useState(0);
  const [attempt, setAttempt] = useState(ATTEMPT_MAX);
  const [isWin, setIsWin] = useState(false);
  const [isFail, setIsFail] = useState(false);
  const [cards, setCards] = useState([]);
  const [nbrGoodCard, setNbrGoodCard] = useState(0);

  useEffect(() => {
    if (attempt === 0)
      setIsFail(true);
  }, [attempt]);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  useEffect(() => {
    if (nbrGoodCard === 0)
      setCards(generateCards());
  }, [nbrGoodCard]);

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const getRandomIntBetween = (min, max) => Math.floor((Math.random() * (max - min)) + min);

  function generateCards() {
    let cards = [];
    const nbrGoodCard = getRandomIntBetween(1, NBR_CARDS / 2);
    setNbrGoodCard(nbrGoodCard);
    for (let i = 0;i < nbrGoodCard;i++)
      cards.push(dataCondoms[0]);

    for (let i = 0;i < NBR_CARDS - nbrGoodCard;i++)
      cards.push(createCard());
    shuffle(cards);

    cards = cards.map((c, index) => ({
      id: index,
      name: c.name,
      slug: c.srcImg[getRandomInt(c.srcImg.length)],
      isValid: c.isValid,
      reasonNotValid: c.reasonNotValid,
      date: c.datePeremption,
      size: c.taille,
      isNorme: c.norme,
    }));

    return cards;
  }

  const createCard = () => {
    const max = dataCondoms.length;
    const condom = dataCondoms[getRandomIntBetween(1, max)];
    condom.image = condom.srcImg[getRandomInt(condom.srcImg.length)];
    return { ...condom };
  };

  const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
    }

    return array;
  };

  const toggleCard = (cardId) => {
    const newCards = cards.map((c) => {
      if (c.id === cardId) {
        if (c.isValid) {
          setScore(score + 1);
          setNbrGoodCard(nbrGoodCard - 1);
        } else
          setAttempt(attempt - 1);
        return {
          ...c,
          clicked: true,
        };
      }
      return c;
    });
    setCards(newCards);
  };

  return (
    <div className={styles.cards_game}>
      <div className={styles.wrapper}>
        MemoCapote
        <div className={styles.score}>
          <div className={styles.box}>
            <p>Nombre de vie : {attempt}</p>
          </div>
          <div className={styles.box}>
            <p>Nombre de points : {score}</p>
          </div>
        </div>
        <div className={styles.cards_container}>
          {cards.map((card) => (
            <Card
              data={card}
              onClick={() => toggleCard(card.id)}
              key={card.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CardsGame;
