import { Link, useParams } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { AppContext } from 'context/AppContext';
import api from 'api';
import arrow from 'assets/images/admin/goBackArrow.svg';
import styles from 'assets/style/leaderboard.module.scss';

const Leaderboard = () => {
  const { currentGame, changeCurrentGame, gamesLoaded, currentScore } = useContext(AppContext);
  const { gameId } = useParams();
  const [leaderboard, setLeaderboard] = useState(null);

  const [username, setUsername] = useState('');
  const [score, setScore] = useState(currentScore);

  const loadLeaderboard = () => {
    api.games.scores(gameId).then((data) => {
      setLeaderboard(data);
    }).catch((error) => {
      console.log(error);
      setLeaderboard([
        {
          id: 1,
          username: 'Toto',
          score: 100,
        },
        {
          id: 2,
          username: 'Titi',
          score: 50,
        },
        {
          id: 3,
          username: 'Tata',
          score: 25,
        }
      ]);
    });
  };

  const handlePreventionMessage = (slug) => {
    if (slug === 'IST Clicker')
      return 'Bravo ! Tu as éliminé une grande variété d’IST ! Par ailleurs, l’infection à la chlamydiae est l’une des plus fréquentes, particulièrement chez les 16-25ans. Elle ne provoque pas forcément de symptômes, mais reste néanmoins dangereuse dû aux effets à long terme ! Voir plus d\'infos : ';
    if (slug === 'Morpion')
      return 'Les morpions, c’est envahissant… et ca peut vite devenir un petit enfer. Mais ne t’inquiète pas, il existe des solutions !! Il est possible d’aller voir son médecin par exemple qui pourra te prescrire des crèmes insecticides, ou simplement de procéder à un rasage pubien. Voir plus d\'infos : ';
    if (slug === 'MemoCapote')
      return 'Tu as su reconnaitre un préservatif utilisable d’un préservatif en mauvais état ou présentant un risque.Penses toujours à vérifier tes protections avant de faire quoi que ce soit avec un ou une partenaire. Voir plus d\'infos';
    if (slug === 'Dépisteur')
      return 'Encore et toujours, le préservatif est ton seul bouclier et fais toi dépister si tu l’as oublié. Voir plus d\'infos : ';
    return 'Vous ne pouvez pas rejouer à ce jeu';
  };

  const getLinkFromSlug = (slug) => {
    if (slug === 'IST Clicker')
      return 'https://www.sexualites-info-sante.fr/focus-sur-une-ist-les-chlamydiae/';
    if (slug === 'Morpion')
      return 'https://www.sida-info-service.org/morpions/';
    if (slug === 'MemoCapote')
      return 'https://www.sida-info-service.org/preservatifs/';
    if (slug === 'Dépisteur')
      return '(https://questionsexualite.fr/s-informer-sur-les-infections-et-les-maladies/les-infections-sexuellement-transmissibles/qu-est-ce-que-la-syphilis/';
    return 'Vous ne pouvez pas rejouer à ce jeu';
  };

  const addScore = () => {
    if (username.length > 0 && parseInt(score) > 0) {
      api.games.addScore(gameId, username, parseInt(score))
        .then((addScoreResult) => {
          console.log(addScoreResult);
          loadLeaderboard();
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  useEffect(() => {
    if (gamesLoaded)
      changeCurrentGame(gameId);
  }, [gamesLoaded]);

  useEffect(() => {
    loadLeaderboard();
  }, []);

  return (
    <div className={styles.background}>
      {currentGame ? (
        <header className={styles.name}>{currentGame?.name}</header>
      ) : (
        <header className={styles.name}> Jeu non trouvé</header>
      )}
      <div className={styles.form}>
        <p className={styles.myScore}>Ton score : {currentScore}</p>
        <input type='text' className={styles.pseudo} placeholder='Pseudo' value={username} onChange={(e) => setUsername(e.target.value)} />
        <button className={styles.bouton} onClick={addScore}>Envoyer</button>
      </div>
      <p className={styles.preventionMessage}>{handlePreventionMessage(currentGame?.name)} <a href={getLinkFromSlug(currentGame?.name)}>{getLinkFromSlug(currentGame?.name)}</a></p>
      <p className={styles.leaderboardName}>Leaderboard</p>
      <div className={styles.wrapper}>
        { leaderboard && leaderboard.map((item, index) => (
          <div key={index} className={styles.bar}>
            <p className={styles.ranking}>#{index + 1}</p>
            <p className={styles.user}>{item?.username}</p>
            <p className={styles.score}>{item?.score}</p>
          </div>
        ))}
      </div>
      <Link className={styles.bottomContent} to={'/'}>
        <img src={arrow} />
        <p>Accueil</p>
      </Link>

    </div>
  );
};

export default Leaderboard;
