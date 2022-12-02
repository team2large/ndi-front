import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import PseudoBar from '../components/PseudoBar';
import arrow from 'assets/images/admin/goBackArrow.svg';
import styles from 'assets/style/Admin.module.scss';

const Admin = () => {
  const [scores, setScores] = useState([]);

  const loadScores = () => {
    api.admin.listScores().then((data) => {
      setScores(data);
    }).catch((error) => {
      console.log(error);
    });
  };

  useEffect(() => {
    loadScores();
  }, []);

  const deleteScore = (id) => {
    api.admin.deleteScore(id)
      .then(() => {
        loadScores();
      })
      .catch((error) => {
        console.log(error);
      });
  };


  return (
    <div className={styles.background}>
      <div className={styles.topContent}>
        <h1>Admin</h1>
        <h2>Classement de tous les jeux</h2>
      </div>
      <div className={styles.wrapper}>
        {scores.map((score, index) => <PseudoBar key={index} onClick={() => deleteScore(score.id)} {...score} />)}
      </div>
      <Link className={styles.bottomContent} to={'/'}>
        <img src={arrow} />
        <p>Accueil</p>
      </Link>
    </div>
  );
};
export default Admin;
