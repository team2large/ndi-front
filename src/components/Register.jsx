import { Link } from 'react-router-dom';

const Test = () => (
  <div>
    <h1>Creer un compte</h1>
    {/* Create a register form with email password lastName firsNamt */}
    <form action='https://api.team2large.fr/register' method='POST'>
      <label htmlFor='email'>Email</label>
      <input type='email' id='email' name='email' />
      <label htmlFor='password'>Password</label>
      <input type='password' id='password' name='password' />
      <label htmlFor='lastName'>Nom</label>
      <input type='text' id='lastName' name='lastName' />
      <label htmlFor='firstName'>Prenom</label>
      <input type='text' id='firstName' name='firstName' />
      <button type='submit'>Creer un compte</button>
    </form>
    <Link to='/'>Retour</Link>
  </div>
);

export default Test;
