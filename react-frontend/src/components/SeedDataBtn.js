import React, { Component } from 'react';
import storyData from '../data/stories.json';
import './css/SeedDataBtn.scss';

class SeedDataBtn extends Component {

  loadAllStoryData = async () => {
    for (let i = 0; i < storyData.length; i++) {
      await fetch('/api/stories/add_story', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(storyData[i])
      })
      .then(res => {
        if (res.ok) return console.log(res.json());
        console.log('Error creating story!');
      })
    }
  }

  render() {
    return (
      <button 
        onClick={this.loadAllStoryData}
        className='SeedDataBtn'
      >
        Import Stories to DB
      </button>
    );
  }
}

export default SeedDataBtn;