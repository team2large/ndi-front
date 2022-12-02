import { useEffect, useState } from 'react';
import crypto from 'crypto-js';
import api from 'api';

const AdminAuth = () => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const [countries, setCountries] = useState([]);
  const hashedPassword = crypto.SHA256(password).toString();

  // const handleSubmit = () => {
  //   api.admin.login(hashedPassword).then((data) => {
  //     console.log(data.message);
  //   }).catch((error) => {
  //     console.log(error);
  //   });
  // };

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
    const countries = object.map((country) => country.name.common).concat(['L\'europe a pas de capitale']);
    // Shuffle the array
    setCountries(shuffle(countries));
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  return (
    <div>
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <select>
        <option>Select a country</option>
        {countries.map((country) => (
          <option value={country} key={country}>{country}</option>
        ))}
      </select>
    </div>
  );
};

export default AdminAuth;
