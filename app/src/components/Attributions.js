import React from 'react';
import './css/Attributions.scss';

const Attributions = props => (
  <h3 className="Attributions">
    All HONY content is the work of Brandon Stanton @
    <br/>
    <a href="https://www.humansofnewyork.com/" target="_blank" rel="noopener noreferrer">
      Humans of New York
    </a>
    &nbsp;&nbsp;
    <a href="https://www.facebook.com/humansofnewyork/" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-facebook-f"></i>
    </a>
    &nbsp;&nbsp;
    <a href="https://twitter.com/humansofny" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-twitter"></i>
    </a>
    &nbsp;&nbsp;
    <a href="https://www.instagram.com/humansofny/" target="_blank" rel="noopener noreferrer">
      <i className="fab fa-instagram"></i>
    </a>
  </h3>
);

export default Attributions;