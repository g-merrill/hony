import React, { useState, useEffect } from 'react';
import './css/GenerateKeyBtn.scss';

const GenerateKeyBtn = () => {
  const [apiKey, setApiKey] = useState('');
  const [clicked, setClicked] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleClick = () => {
    setClicked(true);
    setCounter(1);
  }

// /api/keys/new

  useEffect(() => {
    // get generated key from backend
    const fetchKey = () => {
      fetch('/api/keys/new')
      .then(res => 
        res.json().then(data => {
          setApiKey(data.generated_key);
        })
      );
    }
    counter > 0 && fetchKey()
  }, [counter]);

  // useEffect(() => {
  //   if (counter === 0) {
  //     let newCounter = counter + 1;
  //     setCounter(1)
  //   }
  // }, [counter])
    

  return (
    <div className='GenerateKeyBtn-ctnr'>
    { clicked ? (
      <p className='generatedKey'>Your API Key: {apiKey}</p>
    ) : (
      <button 
        className='GenerateKeyBtn'
        onClick={handleClick}
      >
        GenerateKeyBtn
      </button>
    )}
    </div>
  );
}

export default GenerateKeyBtn;