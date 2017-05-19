import React from 'react';

function Toggle(props) {
  return (
    <span className='toggle' onClick={props.func}>
      {props.name}
    </span>
  );
}

export default Toggle;
