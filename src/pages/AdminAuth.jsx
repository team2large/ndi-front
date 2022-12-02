import { useEffect, useState } from 'react';
import crypto from 'crypto-js';
import { useNavigate } from 'react-router-dom';
import styles from 'assets/style/adminauth.module.scss';
import fier from 'assets/images/adminauth/fier.png';
import heureux from 'assets/images/adminauth/heureux.png';
import pasContent from 'assets/images/adminauth/pas_content.png';
import api from 'api';
const GOODANSWER = 'L\'europe a pas de capitale';

const AdminAuth = () => {
  const [password, setPassword] = useState('');
  const [countries, setCountries] = useState([]);
  const hashedPassword = crypto.SHA256(password).toString();
  const [remainingTime, setRemainingTime] = useState((60 * 10));
  const [timerIsRunning, setTimerIsRunning] = useState(false);
  const [currentFormState, setCurrentFormState] = useState(0);
  const [currFace, setCurrFace] = useState(fier);

  const navigate = useNavigate();


  const handleSubmit = () => {
    api.admin.login(hashedPassword).then(() => {
      navigate('/admin');
    }).catch((error) => {
      console.log(error);
    });
  };

  // shufle array method
  const shuffle = (array) => {
    let currentIndex = array.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  };

  const fetchCountries = async () => {
    const response = await fetch('https://restcountries.com/v3.1/all');
    // Get the name of the countries
    const object = await response.json();
    const countries = object.map((country) => country.name.common).concat([GOODANSWER]);
    // Shuffle the array
    setCountries(shuffle(countries));
  };

  const incrementState = () => {
    setCurrentFormState(currentFormState + 1);
    if (currentFormState > 3)
      handleSubmit();
  };

  const checkCapital = (changeEvent) => {
    if (changeEvent.target.value === GOODANSWER)
      incrementState();
  };

  useEffect(() => {
    fetchCountries();
    if (!timerIsRunning) {
      const interval = setInterval(() => {
        setRemainingTime((oldValue) => {
          if (oldValue < 3 * 60)
            return 10 * 60;
          return oldValue - 1;
        });
      }, 1000);
      setTimerIsRunning(() => true);
      return () => clearInterval(interval);
    }
  }, []);

  let stateCorrespondingElement = (<></>);
  const firstStateCorrespondingElement = (
    <>
      <select onChange={checkCapital}>
        <option>Select a country</option>
        {countries.map((country) => (
          <option value={country} key={country}>{country}</option>
        ))}
      </select>
    </>
  );

  const secondStateCorrespondingElement = (
    <div className={styles.adminAuth}>
      <div>Cliquez sur la flèche rouge pour continuer</div>
      <div>
        <ul>
          <li>➔</li>
          <li>➔</li>
          <li>➔</li>
          <li className={styles.goodChoice} onClick={incrementState}>➔</li>
          <li>➔</li>
        </ul></div>
    </div>
  );

  const thirdStateCorrespondingElement = (
    <div className={styles.timedElement}>
      <div><p>Cliquez sur la réunion dans trois minutes</p></div>
      <div>{`${Math.floor(remainingTime / 60)}:${remainingTime % 60}`}</div>
      <div onClick={incrementState}>la réunion dans trois minutes</div>
    </div>
  );

  const fourthStateCorrespondingElement = (
    <div className={styles.fourthComponent}>
      <p>Il est bien notre design ?</p>
      <div>
        <div onMouseEnter={() => setCurrFace(() => heureux)} onMouseLeave={() => setCurrFace(() => setCurrFace(() => fier))} onClick={incrementState}>Oui</div>
        <div><img width={100} src={currFace} alt='Personne dubitative'/></div>
        <div onMouseEnter={() => setCurrFace(() => pasContent)} onMouseLeave={() => setCurrFace(() => setCurrFace(() => fier))} onClick={() => alert('tu t\'es trompé je crois ^^ je te laisse une autre chance haha ! uWu')}>Non</div>
      </div>
    </div>
  );

  switch (currentFormState) {
    case 0:
      stateCorrespondingElement = firstStateCorrespondingElement;
      break;
    case 1:
      stateCorrespondingElement = secondStateCorrespondingElement;
      break;
    case 2:
      stateCorrespondingElement = thirdStateCorrespondingElement;
      break;
    default:
      stateCorrespondingElement = fourthStateCorrespondingElement;
      break;
  }

  return (
    <div className={styles.mainWrapper}>
      <div>
        <label htmlFor='password'>Password</label>
        <input
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        { stateCorrespondingElement }
      </div>
    </div>
  );
};

export default AdminAuth;
