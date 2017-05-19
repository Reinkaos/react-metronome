import React from 'react';

function Controls(props) {
  return (
     <div className='controls'>
      <div className='plus' onClick={ () => props.updateTempo(props.tempo + 1)}>
        +
      </div>

      <input className='tempo-range' type='range' min='0' max='200' value={props.tempo} onChange={props.changeTempo} />

      <div className='minus' onClick={ () => props.updateTempo(props.tempo - 1)}>
        -
      </div>
    </div>
  );
}

export default Controls;
