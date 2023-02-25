import React from 'react';

function Banner(props) {
  return (
    <div style={{ background: props.background, color: props.color }}>
      <h1>{props.title}</h1>
      <p>{props.subtitle}</p>
    </div>
  );
}

export default Banner;