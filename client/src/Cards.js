import React from 'react';
import './Cards.css';
export default function cards(props) {
  return (
    <div className='card'>
      
        <div className="text">{props.id+") " +props.about}</div>

    </div>
  )
}
