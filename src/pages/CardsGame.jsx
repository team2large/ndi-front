
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from 'context/AppContext';
import Card from 'components/Card';
import styles from 'assets/style/cardsgame.module.scss';
import dataCondoms from 'components/condoms.json';

const CardsGame = () => {
  const { palette } = useContext(AppContext);

  const ATTEMPT_MAX = 3;
  const NBR_CARDS = 9;

  const [score, setScore] = useState(null);
  const [attempt, setAttempt] = useState(0);
  const [isWin, setIsWin] = useState(false);
  const [cards, setCards] = useState([]);

  useEffect(() => {
    if (attempt === ATTEMPT_MAX) {
      setIsWin(false);
      setScore(0);
    } else if (isWin)
      setScore(ATTEMPT_MAX - attempt);
  }, [attempt]);

  useEffect(() => {
    setCards(generateCards());
  }, []);

  const getRandomInt = (max) => Math.floor(Math.random() * max);

  const getRandomIntBetween = (min, max) => Math.floor((Math.random() * (max - min)) + min);

  function generateCards() {
    let cards = [];
    const nbrGoodCard = getRandomIntBetween(1, NBR_CARDS / 2);
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
        return {
          ...c,
          clicked: !c.clicked,
        };
      }

      return c;
    });
    setCards(newCards);
    // validite
    // gerer le jeu
    // check game ended
  };

  const validateSelecion = () => {
    const validCards = cards.filter((c) => c.isValid);
    const selectedCards = cards.filter((c) => c.clicked);
    const validSelectedCards = selectedCards.filter((c) => c.isValid);
    const invalidSelectedCards = selectedCards.filter((c) => !c.isValid);
    if (validCards.length !== selectedCards.length) {
      alert(`Vous devez sélectionner ${validCards.length} cartes`);
      return;
    }

    const allValid = selectedCards.every((c) => c.isValid);
    if (allValid)
      alert('Bravo, vous avez gagné');
    else
      alert(`${validSelectedCards.length} cartes sont valides, ${invalidSelectedCards.length} cartes sont invalides`);
  };

  return (
    <div className={styles.cards_game}>
      <div className={styles.wrapper}>
        <div className={styles.cards_container}>
          {cards.map((card) => (
            <Card
              data={card}
              onClick={() => toggleCard(card.id)}
              key={card.id}
            />
          ))}
        </div>
        <div
          className={styles.button}
          onClick={validateSelecion}
          style={{ backgroundColor: palette[3] }}
        >Valider la sélection</div>
      </div>
    </div>
  );
};

export default CardsGame;
