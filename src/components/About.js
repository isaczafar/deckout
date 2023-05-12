import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 
import { AppContext } from '../App';

const About = () => {

    const { author, setAuthor } = useContext(AppContext);
    const handleAuthorChange = (e) => {
        
        setAuthor(e.target.value);
    };

    return (
        <div
            style={{
                backgroundImage: `url(${process.env.PUBLIC_URL}/aluber.jpg)`,
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
                    position: 'relative',
                    textAlign: 'center',
                    color: '#fff',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    padding: '1rem',
                }}
            >
                <h1
                    style={{
                        fontSize: '3rem',
                        marginBottom: '1rem',
                    }}
                >
                    About this site:
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
                    This page is meant to allow you to build your own Yu-gi-oh deck. Every single released card currently is available to pick. 
                    Once you're happy with your deck, save it, name it and it will be saved. Currently you can only make one deck at a time.
                    If you want to see a suggested deck, click on the button below!
                </p>
                <Link to="/decks" className="button"> 
                    Suggested deck
                </Link>
            </div>
            <div>
                <p style={{
                        fontSize: '1.5rem',
                        maxWidth: '500px',
                        margin: '0 auto',
                        lineHeight: '1.6',
                        marginBottom: '2rem',
                        color: "#fff" 
                    }}>Change footer here: {author}</p>
                <input type="text" value={author} onChange={handleAuthorChange} />
            </div>
        </div>
    );
};

export default About;
