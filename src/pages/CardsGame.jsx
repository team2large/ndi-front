import React, { useEffect, useState } from 'react';
import Card from 'components/Card';
import styles from 'assets/style/cardsgame.module.scss';
import dataCondoms from 'components/condoms.json';

const CardsGame = () => {
  // const ATTEMPT_MAX = 3;

  // const [score, setScore] = useState(null);
  // const [attempt, setAttempt] = useState(0);
  // const [isWin, setIsWin] = useState(false);
  // const [condoms, setCondoms] = useState([]);

  // const cards = [];

  // useEffect(() => {
  //   for (let i = 0;i < 9;i++)
  //     cards.push(<Card />);
  // }, []);

  // useEffect(() => {
  //   if (attempt === ATTEMPT_MAX) {
  //     setIsWin(false);
  //     setScore(0);
  //   } else if (isWin)
  //     setScore(ATTEMPT_MAX - attempt);
  // }, [attempt]);

  // un state qui contient toutes les cartes en jeu -> 9
  const [cards, setCards] = useState([
    {
      id: 1,
      name: 'Préservatif qu\'il faut',
      isValid: true,
      slug: 'capote_pas_utilise_orange',
      reasonNotValid: 'bonsoir',
      date: new Date(),
      size: 'L',
      isNorme: true,
      clicked: false,
    },
    {
      id: 2,
      name: 'Préservatif qu\'il faut',
      isValid: true,
      slug: 'capote_pas_utilise_orange',
      reasonNotValid: 'bonsoir',
      date: new Date(),
      size: 'L',
      isNorme: true,
      clicked: false,
    },
    {
      id: 3,
      name: 'Préservatif qu\'il faut',
      isValid: true,
      slug: 'capote_pas_utilise_orange',
      reasonNotValid: 'bonsoir',
      date: new Date(),
      size: 'L',
      isNorme: true,
      clicked: false,
    },
    {
      id: 4,
      name: 'Préservatif qu\'il faut',
      isValid: true,
      slug: 'capote_pas_utilise_orange',
      reasonNotValid: 'bonsoir',
      date: new Date(),
      size: 'L',
      isNorme: true,
      clicked: false,
    },
    {
      id: 5,
      name: 'Préservatif qu\'il faut',
      isValid: true,
      slug: 'capote_pas_utilise_orange',
      reasonNotValid: 'bonsoir',
      date: new Date(),
      size: 'L',
      isNorme: true,
      clicked: false,
    },
    {
      id: 6,
      name: 'Préservatif qu\'il faut',
      isValid: true,
      slug: 'capote_pas_utilise_orange',
      reasonNotValid: 'bonsoir',
      date: new Date(),
      size: 'L',
      isNorme: true,
      clicked: false,
    }
  ]);

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

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const setError = (condom) => {
    for (let i = 0;i < getRandomInt(2);i++) {
      switch (getRandomInt(2)) {
        case 0:
          condom.date = new Date() - getRandomInt(300);
          condom.reasonNotValid += 'La date de péremption est passée.';
          break;
        case 1:
          condom.isNorme = true;
          condom.reasonNotValid += 'Il faut que le préservatif soit conforme à la réglementation européenne.';
          break;
        default:
          break;
      }
    }
  };

  const createCard = () => {
    const max = dataCondoms.length;
    const condom = dataCondoms[getRandomInt(max)];
    condom.srcImg = condom.srcImg[getRandomInt(condom.imgSrc.length)];
    condom.isNorme = true;
    condom.taille = 'L';
    condom.date = new Date() + getRandomInt(300);
    if (getRandomInt(2)) {
      condom.isValid = false;
      setError(condom);
    }
    console.log(condom);
    return condom;
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
      </div>
    </div>
  );
};

export default CardsGame;
