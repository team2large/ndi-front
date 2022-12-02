import { useEffect, useState } from 'react';
import api from '../api';
import PseudoBar from '../components/PseudoBar';
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
    <main className={styles.background}>
      <div className={styles.wrapper}>
        {scores.map((score, index) => <PseudoBar key={index} onClick={() => deleteScore(score.id)} {...score} />)}
      </div>
    </main>
  );
};
export default Admin;
