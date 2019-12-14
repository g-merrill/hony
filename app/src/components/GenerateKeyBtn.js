import React from 'react';
import './css/GenerateKeyBtn.scss';

const GenerateKeyBtn = ({ updateUserWithKey, user, logoutUser }) => {

  const fetchKey = () => {
    fetch('/api/keys/new', {
      method: 'POST',
      headers: new Headers({ 'Content-Type': 'application/json' }),
      body: JSON.stringify(user)
    })
    .then(() => {
      // this pulls the updated user with the newly generated key from the backend
      updateUserWithKey();
    })
  }

  return (
    <div className='GenerateKeyBtn-ctnr'>
    { user.key ? (
      <>
        <p className='key-generated-msg'>
          API Key Generated!
        </p>
        <button 
          className='logout-btn' 
          onClick={logoutUser}
        >
          Log Out
        </button>
      </>
    ) : (
      <>
        <button 
          className='GenerateKeyBtn'
          onClick={fetchKey}
        >
          Generate Key!
        </button>
        <button 
          className='logout-btn' 
          onClick={logoutUser}
        >
          Log Out
        </button>
      </>
    )}
    </div>
  );
}

export default GenerateKeyBtn;