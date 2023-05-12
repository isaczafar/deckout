import React, { useContext } from 'react';
import { AppContext } from '../App';

const Footer = () => {
  const { author } = useContext(AppContext); 
  return (
    <footer
      style={{
        backgroundColor: '#000',
        color: '#fff',
        position: 'fixed',
        bottom: 0,
        width: '100%',
        textAlign: 'center',
      }}
    >
      <p>|| Deck-Out made by Isac || {author} is also cool</p>
    </footer>
  );
};

export default Footer;
