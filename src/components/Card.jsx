import React, { useState } from 'react';
import Tilt from 'react-parallax-tilt';
import dataCondoms from 'components/condoms.json';
import styles from 'assets/style/card.module.scss';

const Card = () => {
  const [isClicked, setIsClicked] = useState(false);

  const isNorme = true;
  const taille = 'XXXL';
  const date = new Date();

  const handleClick = () => {
    setIsClicked(true);
  };

  function getRandomInt(max) {
    return Math.floor(Math.random() * max);
  }

  const randomize = (nbrCards) => {
    const max = dataCondoms.length;
    const condoms = [];
    let condom;
    for (let i = 0;i < nbrCards;i++) {
      condom = dataCondoms[getRandomInt(max)];
      condom.isNorme = true;
      condom.taille = 'L';
      condom.date = new Date() - getRandomInt(300);
      switch (getRandomInt(4)) {
        case 1:
          condom.date = new Date() - getRandomInt(300);
          condom.reasonNotValid += 'La date de péremption est passée';
          break;
        case 2:
          condom.taille = 'XXXXXXXL';
          condom.reasonNotValid += 'La taille est trop grande.';
          break;
        case 3:
          condom.isNorme = true;
          condom.reasonNotValid += 'Il faut que le préservatif soit conforme à la réglementation européenne';
          break;
        default:
          break;
      }
    }
    condoms.push(condom);
    console.log(condoms);
  };


  randomize(10);

  return (
    <Tilt>
      <div className={styles.card} onClick={handleClick}>
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
