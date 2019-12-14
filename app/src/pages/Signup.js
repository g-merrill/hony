import React, { useState } from 'react';
import './css/Signup.scss';

const Signup = ({ signupUser, history }) => {
  const [messages, setMessages] = useState([])
  const [email, setEmail] = useState('')
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = evt => {
    if (evt.target.name === 'email') {
      setEmail(evt.target.value);
    } else if (evt.target.name === 'name') {
      setName(evt.target.value);
    } else {
      setPassword(evt.target.value);
    }
  }

  const handleSubmit = async evt => {
    evt.preventDefault();
    const creds = { email, name, password }
    // perform backend authentication
    try {
      const user = await fetch('/auth/signup', {
        method: 'POST',
        headers: new Headers({'Content-Type': 'application/json'}),
        body: JSON.stringify(creds)
      }).then(res => res.json());
      if (user.message) {
        throw new Error();
      } else {
        // perform any now-logged-in actions, probably set user in app's state via calling function from here
        signupUser(user);
        history.push('/');
      }
    } catch (err) {
      setMessages(['Email address already exists.'])
    }
  }

  return (
    <form className="Signup" onSubmit={handleSubmit}>
      <div className="field">
        <input className="input" type="email" name="email" placeholder="Email" value={email} onChange={handleChange} />
      </div>
      <div className="field">
        <input className="input" type="text" name="name" placeholder="Name" value={name} onChange={handleChange} />
      </div>
      <div className="field">
        <input className="input" type="password" name="password" placeholder="Password" value={password} onChange={handleChange} />
      </div>
      <button className="signup-btn">Sign Up</button>
    { messages.length ? (
      <p className='try-again'>{messages[0]}</p>
    ) : null }
    </form>
  )
}

export default Signup;