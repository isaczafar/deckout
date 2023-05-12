import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL}/branded-red.png)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <h1
          style={{
            fontSize: '3rem',
            marginBottom: '1rem',
          }}
        >
          Welcome to Deck-out!
        </h1>
        <p
          style={{
            fontSize: '1.5rem',
            maxWidth: '500px',
            margin: '0 auto',
            lineHeight: '1.6',
            marginBottom: '2rem', 
          }}
        >
          This is the home page of your application. Add additional text or content here.
        </p>
        <Link to="/card" className="button"> 
          Build your deck
        </Link>
      </div>
    </div>
  );
};

export default Home;
