import React, { useState, useEffect } from 'react';
import { Button } from './Button';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [click, setClick] = useState(false);
  const [button, setButton] = useState(true);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const navigate = useNavigate();

  const handleGoToDeck = () => {
    closeMobileMenu();
    navigate('/#deck');
  };

  const showButton = () => {
    if (window.innerWidth <= 960) {
      setButton(false);
    } else {
      setButton(true);
    }
  };

  useEffect(() => {
    showButton();
  }, []);

  window.addEventListener('resize', showButton);

  return (
    <>
      <nav className='navbar'>
        <div className='navbar-container'>
          <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
            Deck-Out
            <i className='fa-solid fa-ankh' />
          </Link>
          <div className='menu-icon' onClick={handleClick}>
            <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
          </div>
          <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <li className='nav-item'>
              <Link to='/about' className='nav-links' onClick={closeMobileMenu}>
                About
              </Link>
            </li>
            <li className='nav-item'>
              <Link
                to='/decks'
                className='nav-links'
                onClick={closeMobileMenu}
              >
                Deck suggestions
              </Link>
            </li>

            <li>
              <Link
                to="/card"
                className="nav-links-mobile"
                onClick={closeMobileMenu}
              >
                Go to Deck
              </Link>
            </li>
          </ul>
          {button && (
            <Button
              buttonStyle="btn--outline"
              onClick={handleGoToDeck}
            >
              Build Deck
            </Button>
          )}
        </div>
      </nav>
    </>
  );
}

export default Navbar;
