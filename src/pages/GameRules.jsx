import { useNavigate, useParams } from 'react-router-dom';
import React from 'react';
import styles from 'assets/style/gamerules.module.scss';
import playButton from 'assets/images/gamerules/playButton.png';
import gameRulesSlugToFileMapping from 'assets/json/gameRulesSlugToFileMapping.json';

const GameRules = () => {
  const { gameId } = useParams();
  const navigate = useNavigate();

  if (!Object.keys(gameRulesSlugToFileMapping).includes(gameId)) {
    // On vérifie que le jeu existe. Sinon on le redirige à l'accueil
    React.useEffect(() => navigate('/'));
    return;
  }

  const gameRuleImageURI = gameRulesSlugToFileMapping[gameId];

  return (
    <div className={styles.home}>
      <main className={'container'}>
        <div><img src={gameRuleImageURI} alt='Règles du jeu courant'/></div>
        <div><a href='play'>Jouer au jeu <img src={playButton} width={30} height={30} alt='Lancer le jeu'/></a></div>
      </main>
    </div>
  );
};

export default GameRules;
