import { useContext } from 'react';
import { AppContext } from 'context/AppContext';
import { Link } from 'react-router-dom';
import GameCard from './GameCard';
import styles from 'assets/style/home.module.scss';
import mainStyles from 'assets/style/main.module.scss';

const Home = () => {
  const { games, palette } = useContext(AppContext);

  return (
    <div className={mainStyles.main}>
      <main>
        <header>
          <h1>
            <img src='https://upload.wikimedia.org/wikipedia/commons/0/0a/Virus_green.svg' alt='logo' />
            IST&apos;eirb (insérer un nom ici)</h1>
          <h2>Sous-titre</h2>
        </header>
        <div className={styles.container}>
          <div className={styles.games}>
            {games.map((game, index) => (
              <GameCard key={game.slug} color={palette[index % palette.length]} {...game} />
            ))}
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Bienvenue sur WEBSITE NAME !</h1>
            <p>
              Parlons d&apos;un sujet tabou et pas très fun : les IST !
              Aujourd&apos;hui le véritable problème avec les infections sexuellement transmissibles ce n&apos;est pas les soins mais la prévention,
              beaucoup trop de personnes sont peu informées des risques et des gestes à adopter pour avoir une vie sexuelle saine et libérée. Et c&apos;est là que nous intervenons !
            </p>
            <p>
              Dans le cadre de la Nuit de L&apos;info 2022, Sida Info Service a fait appel à nous pour créer un site web te permettant à toi
              (oui toi, là !) de mieux comprendre les IST. Hépatite B, chlamydias, papillomavirus, comment s&apos;en protéger, comment les soigner, bref, comment ça marche.
            </p>
            <p>
              Mais on te voit venir ! “Encore un site de prévention ennuyeux avec des pavés de textes à lire…” Non non non !
              Pas de ça chez nous ! Ici tu ne lis pas, tu joues ! On te propose une sélection de mini-jeux sur le thème des IST avec
              des infos disséminés par-ci par-là. Notre objectif c&apos;est que tu passes un bon moment et que tu en apprennes plus sans trop t&apos;en rendre compte.
            </p>
            <p>
              Bref, clique sur un de nos jeux au nom un peu graveleux et passe un bon moment !
            </p>
          </div>
        </div>
        <footer>
          <p>© 2022 - HTTP 413 - Team Too Large</p>
          <Link to={'/admin/login'}>
            <p>Le bo bouton</p>
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default Home;
