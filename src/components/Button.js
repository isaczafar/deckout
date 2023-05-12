import React from 'react';
import "./Button.css";
import { Link } from "react-router-dom";

const STYLES = ["btn--primary", "btn--outline"];

const SIZES = ["btn--medium", "btn--large"];

export const Button = ({children,
     type,
      onClick,
       buttonStyle,
       buttonSize
    }) => {
        const checkButtonStyle = STYLES.includes(buttonStyle)
         ? buttonStyle 
         : STYLES[0];

         const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0]

         const handleButtonClick = () => {
           const deckElement = document.getElementById('deck');
           if (deckElement) {
             deckElement.scrollIntoView({ behavior: 'smooth' });
           }
         };

         return (
            <Link to="/card" className="btn-mobile">
              <button
              className={`btn ${checkButtonStyle} ${checkButtonSize}`}
              onClick={() => {
                onClick();
                handleButtonClick();
              }}
              type={type}
              >
                {children}
                </button>  
            </Link>
         )
};
