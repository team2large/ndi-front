import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from 'context/AppContext';
import Modal from 'components/Modal';
import { useDrag, useDrop } from 'react-dnd';
import ReactConfetti from 'react-confetti';
import GameCard from '../components/GameCard';
import styles from 'assets/style/home.module.scss';
import mainStyles from 'assets/style/main.module.scss';
import virusStyles from 'assets/style/homeVirus.module.scss';

const Home = () => {
  const { games } = useContext(AppContext);
  const modalRef = useRef();
  const [confetti, setConfetti] = useState(false);

  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  useEffect(() => {
    document.addEventListener('mousemove', (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    });
  }, []);

  const [{ opacity }, dragRef] = useDrag(
    () => ({
      type: 'CAPOTE',
      item: { name: 'capote' },
      collect: (monitor) => ({
        opacity: monitor.isDragging() ? 0.5 : 1,
      }),

    }));

  const [collectedProps, drop] = useDrop(() => ({
    accept: 'CAPOTE',
    drop: (item, monitor) => {
      setConfetti(true);
      modalRef.current.open('Félicitations !', 'Bravo, vous avez trouvé l\'easter egg !');
    },
  }));

  useEffect(() => {
    if (confetti) {
      setTimeout(() => {
        setConfetti(false);
      }, 10000);
    }
  }, [confetti]);

  return (
    <div className={mainStyles.main}>
      <main>
        {confetti && <ReactConfetti/>}
        <header style={{ display: 'flex', justifyContent: 'center', gap: 12, alignItems: 'center', flexDirection: 'row' }}>
          <img style={{ opacity }}ref={dragRef} src='/img/games/depisteur/capote_normale_orange.png' alt='Préservatif' />
          <h1>No mISTery</h1>
          <img ref={drop} src='/img/games/depisteur/virus.png' alt='Infection Sexuellement Transmissible' />
        </header>
        <div className={styles.container}>
          <div className={styles.games}>
            {games.map((game) => (
              <GameCard key={game.slug} {...game} />
            ))}
          </div>
        </div>
        <div className={styles.container}>
          <div className={styles.content}>
            <h1>Bienvenue sur No mISTery !</h1>
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
        <div className={virusStyles.virusContainer} style={{ transform: `translate(${mousePosition.x / 100}px, ${mousePosition.y / 50}px) scale(${1 - (mousePosition.y / 40000)})` }}>
          <img className={virusStyles.virus} id={virusStyles.v1} src={`/img/games/ist_clicker/enemies/gale.png`} />
          <img className={virusStyles.virus} id={virusStyles.v2} src={`/img/games/ist_clicker/enemies/chlamydiae.png`} />
          <img className={virusStyles.virus} id={virusStyles.v3} src={`/img/games/ist_clicker/enemies/gonorrhee.png`} />
          <img className={virusStyles.virus} id={virusStyles.v4} src={`/img/games/ist_clicker/enemies/hepatite_b.png`} />
          <img className={virusStyles.virus} id={virusStyles.v5} src={`/img/games/ist_clicker/enemies/morpion.png`} />
          <img className={virusStyles.virus} id={virusStyles.v6} src={`/img/games/ist_clicker/enemies/vih.png`} />
          <img className={virusStyles.virus} id={virusStyles.v7} src={`/img/games/ist_clicker/enemies/hpv.png`} />
        </div>
        <Modal ref={modalRef} />
        <footer>
          <p>
            © 2022 - HTTP 413 - Team Too Large :<br />
            <span>Anaelle - Guillaume - Célian - Marius - Youri - Tomm - Alexandre - Andréas - Valentin - Antoine - Hugo - Killian - Ethan - Lucas - Léo - Enzo - Ruben</span>
          </p>
        </footer>
        <Link className={styles.linkAdmin} to={`/admin/login`}>Admin</Link>
      </main>
    </div>
  );
};

export default Home;
