import React, { Component } from 'react';
import './css/Stories.scss';

export class Stories extends Component {

  render() {
    return (
      <ul
        className='Stories'
      >
        {this.props.stories.map((story, idx) => {
          if (idx < 10) return (
            <li 
              key={idx}
              className='story'
            >
              {story.timestamp && <p>{story.timestamp}</p>}
              <p>
                {story.sequence && <span>{story.sequence}</span>}
                {story.content}
              </p>
              {story.location && <p>({story.location})</p>}
              <img 
                className='story-img'
                src={story.url} 
                alt="honypic"
              />
            </li>
          );
        })}
      </ul>
    );
  }
}