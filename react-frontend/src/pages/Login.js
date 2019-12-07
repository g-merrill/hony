import React, { useState } from 'react';
import './css/Login.scss';

const Login = ({ loginUser, history }) => {

  const [messages, setMessages] = useState([])
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState('false');

  const handleChange = evt => {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value);
    } else {
      setPassword(evt.target.value);
    }
  }

  const handleCheckboxChange = evt => {
    setRemember(`${evt.target.checked}`);
  }

  const handleSubmit = async evt => {
    evt.preventDefault();
    const creds = { email, password, remember }
    // perform backend authentication
    try {
      const user = await fetch('/auth/login', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(creds)
      }).then(res => res.json());
      if (user.message) {
        throw new Error();
      } else {
        // perform any now-logged-in actions, probably set user in app's state via calling function from here
        loginUser(user);
        history.push('/');
      }
    } catch (err) {
      setMessages(['Please check your login details and try again.'])
    }
  }

  return (
    <form className="Login" onSubmit={handleSubmit}>
      <div className="field">
        <input 
          className="input" 
          type="email" 
          name="email" 
          placeholder="Your Email" 
          value={email}
          onChange={handleChange}
        />
      </div>
      <div className="field">
        <input 
          className="input" 
          type="password" 
          name="password" 
          placeholder="Your Password" 
          value={password}
          onChange={handleChange} 
        />
      </div>
      <div className="field">
        <label className="checkbox">
          <input 
            className="checkbox-input" 
            type="checkbox" 
            onChange={handleCheckboxChange}
          />
          Remember me
        </label>
      </div>
      <button className="login-btn">Login</button>
      { messages.length ? (
        <p>{messages[0]}</p>
      ) : null }
    </form>
  )
}

export default Login;