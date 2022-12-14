import { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppContext } from 'context/AppContext';
import Card from 'components/Card';
import Modal from 'components/Modal';
import styles from 'assets/style/memocapote.module.scss';
import dataCondoms from 'components/condoms.json';

const MemoCapote = () => {
  const { setCurrentScore } = useContext(AppContext);
  const modalRef = useRef();
  const navigate = useNavigate();

  const ATTEMPT_MAX = 3;
  const NBR_CARDS = 9;

  const [score, setScore] = useState(0);
  const [attempt, setAttempt] = useState(ATTEMPT_MAX);
  const [cards, setCards] = useState([]);
  const [nbrGoodCard, setNbrGoodCard] = useState(0);

  useEffect(() => {
    if (attempt === 0) {
      setCurrentScore(score);
      modalRef.current.open(
        'Vous avez perdu',
        `Vous avez marqué au total : ${score} points`
      );
    }
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
    let currentIndex = array.length,
      randomIndex;
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
        } else {
          modalRef.current.open('Mauvaise réponse', c.reasonNotValid);
          setAttempt(attempt - 1);
        }
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
        <h1>MemoCapote</h1>
        <div className={styles.score}>
          <div className={styles.box}>
            <p>{score} Points</p>
          </div>
          <div className={styles.box}>
            <p>{attempt} ❤️</p>
          </div>
        </div>
        {attempt === 0 ? (
          <button className={styles.eButton} onClick={() => navigate(`/games/memory_capote/leaderboard`)}>Sauvegarder mon classement</button>
        ) : (
          <div className={styles.cards_container}>
            {cards.map((card) => (
              <Card
                data={card}
                onClick={() => toggleCard(card.id)}
                key={card.id}
              />
            ))}
          </div>
        )}
      </div>
      <Modal ref={modalRef} />
    </div>
  );
};

export default MemoCapote;
