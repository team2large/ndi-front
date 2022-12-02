import { Link } from 'react-router-dom';
import GameCard from './GameCard';
import styles from 'assets/style/home.module.scss';

const Home = () => {
  const palette = [
    '#ff99c8',
    '#fcf6bd',
    '#d0f4de',
    '#a9def9',
    '#e4c1f9'
  ];

  const games = [
    {
      id: 0,
      slug: 'depisteur',
      name: 'Game 1',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat, lorem non suscipit porttitor, nunc quam eleifend turpis, ut dignissim tortor mauris ac eros. Pellentesque.',
    },
    {
      id: 1,
      slug: 'ist_clicker',
      name: 'Game 2',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat, lorem non suscipit porttitor, nunc quam eleifend turpis, ut dignissim tortor mauris ac eros.',
    },
    {
      id: 2,
      slug: 'memory_capote',
      name: 'Game 3',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat, lorem non suscipit porttitor, nunc quam eleifend turpis, ut dignissim tortor mauris ac eros. Pellentesque mollis consequat imperdiet',
    },
    {
      id: 3,
      slug: 'storytelling',
      name: 'Game 4',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut consequat',
    }
  ];

  return (
    <div className={styles.home}>
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
              <GameCard key={game.id} color={palette[index % palette.length]} {...game} />
            ))}
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Bienvenue sur WEBSITE NAME !</h1>
            <p>Parlons d’un sujet tabou et pas très fun : <strong>les IST</strong> ! Aujourd’hui le véritable problème avec les infections
              sexuellement transmissibles ce n’est pas les <em>soins</em> mais la <em>prévention</em>, beaucoup trop de personnes sont peu
              informées des <em>risques</em> et des <em>gestes à adopter</em> pour avoir une vie sexuelle saine et libérée. Et c’est là
              que nous intervenons !</p>
            <p>Dans le cadre de la <strong>Nuit de L’info 2022</strong>, Sida Info Service a fait appel à nous pour créer un site web te
              permettant à toi (oui toi, là !) de mieux comprendre les IST. <em>Hépatite B</em>, <em>chlamydias</em>, <em>papillomavirus</em>,
              comment s’en protéger, comment les soigner, bref, comment ça marche.</p>
            <p>Mais on te voit venir ! “Encore un site de prévention ennuyeux avec des pavés de textes à lire…” Non non
              non ! Pas de ça chez nous ! Ici tu ne lis pas, tu <strong>joues</strong> ! On te propose une sélection de mini-jeux sur le
              thème des IST avec des infos disséminés par-ci par-là. Notre objectif c’est que tu passes un bon moment et
              que tu en apprennes plus sans trop t’en rendre compte.</p>

            <p>Bref, clique sur un de nos jeux au nom un peu graveleux et passe un bon moment !</p>
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
