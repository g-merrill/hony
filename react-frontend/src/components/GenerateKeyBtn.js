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

  useEffect(() => {
    // get generated key from backend
    const fetchKey = async() => {
      // actual await fetch call here instead of dummy string
      const keyFromAPI = await 'DF2sD4';
      setApiKey(keyFromAPI);
      console.log(keyFromAPI);
    }
    counter > 0 && fetchKey()
    console.log('ran this function')
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