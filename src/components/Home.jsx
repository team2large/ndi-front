import { Link } from 'react-router-dom';
import styles from 'assets/style/home.module.scss';
import logo from 'logo.svg';

const Home = () => (
  <div className={styles.home}>
    <header>
      <img src={logo} className={styles.homeLogo} alt='logo' />
      <p>
        Edit <code>src/components/home.js</code> and save to reload.
      </p>
      <Link to='/test'>
        HTTP 413 Team 2 Large (Cliquez)
      </Link>
    </header>
  </div>
);

export default Home;
