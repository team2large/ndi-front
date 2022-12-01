import { useState } from 'react';
import crypto from 'crypto-js';
import axios from 'axios';

const AdminAuth = () => {
  const [password, setPassword] = useState('');
  const [result, setResult] = useState('');
  const hashedPassword = crypto.SHA256(password).toString();

  const handleSubmit = async () => {
    const result = await axios.post('https://api.team2large.fr/login', {
      password: hashedPassword,
    });
    setResult(result.data);
  };

  const handleSubmite = async (event) => {
    event.preventDefault();
    // Fetch https://restcountries.com/v3.1/all'
    const response = await fetch('https://restcountries.com/v3.1/all');
  };

  return (
    <div>
      <label htmlFor='password'>Password</label>
      <input
        type='password'
        id='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
};

export default AdminAuth;
