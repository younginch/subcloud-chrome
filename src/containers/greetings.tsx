import React, { useState } from 'react';
import icon from '../assets/icon-128.png';

export default function GreetingComponent() {
  const [name] = useState('dev');

  return (
    <div>
      <p>Hello, {name}!</p>
      <img src={icon} alt="extension icon" />
    </div>
  );
}
