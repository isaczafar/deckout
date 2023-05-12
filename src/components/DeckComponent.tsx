import React, { useState } from 'react';
import Used from './Used';
import './Deck.css';

const DeckComponent = () => {
  const preMadeDeck = [
    { cardName: 'The Bystial Lubellion', cardQty: 1 },
    { cardName: 'Albion the Shrouded Dragon', cardQty: 1 },
    { cardName: 'Bystial Saronir', cardQty: 1 },
    { cardName: 'Aluber the Jester of Despia', cardQty: 1 },
    { cardName: 'Dark Magician', cardQty: 1 },
    { cardName: 'Fallen of Albaz', cardQty: 1 },
    { cardName: 'Blazing Cartesia, the Virtuous', cardQty: 1 },
    { cardName: 'Ad Libitum of Despia', cardQty: 1 },
    { cardName: 'Despian Tragedy', cardQty: 1 },
    { cardName: 'Tri-Brigade Mercourier', cardQty: 1 },
    { cardName: 'Nibiru, the Primal Being', cardQty: 1 },
    { cardName: 'Springans Kitt', cardQty: 1 },
    { cardName: 'Ash Blossom & Joyous Spring', cardQty: 1 },
    { cardName: 'Branded Opening', cardQty: 1 },
    { cardName: 'Branded Fusion', cardQty: 1 },
    { cardName: 'Branded Lost', cardQty: 1 },
    { cardName: 'Branded in Red', cardQty: 1 },
    { cardName: 'Fusion Deployment', cardQty: 1 },
    { cardName: 'Called by the Grave', cardQty: 1 },
    { cardName: 'Foolish Burial', cardQty: 1 },
    { cardName: 'Book of Eclipse', cardQty: 1 },
    { cardName: 'Branded Banishment', cardQty: 1 },
    { cardName: 'Branded Retribution', cardQty: 1 },
    { cardName: 'Mirrorjade the Iceblade Dragon', cardQty: 1 },
    { cardName: 'Lubellion the Searing Dragon', cardQty: 1 },
    { cardName: 'Albion the Branded Dragon', cardQty: 1 },
    { cardName: 'Rindbrumm the Striking Dragon', cardQty: 1 },
    { cardName: 'Brigrand the Glory Dragon', cardQty: 1 },
    { cardName: 'Granguignol the Dusk Dragon', cardQty: 1 },
    { cardName: 'Despian Quaeritis', cardQty: 1 },
    { cardName: 'Guardian Chimera', cardQty: 1 },
    { cardName: 'Masquerade the Blazing Dragon', cardQty: 1 },
    { cardName: 'Red-Eyes Dark Dragoon', cardQty: 1 },
  ];

  const [isCardsLoaded, setIsCardsLoaded] = useState(false); 

  const handleLoadCardsClick = () => {
    setIsCardsLoaded(!isCardsLoaded);
  };

  return (
    <div className='container'>
       <h2 className='titel'>Deck Suggestion</h2>
    <h3 className='subtitel'>Isac's Branded Despia Deck</h3>
    <p className='expla'>The object of the deck is simple. It's a fusion focused deck that can summon a variety of powerful fusion monsters to overwhelm the field.
        It's a very strong deck in the meta but is also on the more expensive side. Some of the cards cost 60 euros a pop.
        However, a strong foundation can be built by buying the Albaz Strike structure deck which costs 10 euros and contains many of the deck's staples.
      </p>
      <button className="open" onClick={handleLoadCardsClick}>
        {isCardsLoaded ? 'Hide Deck' : 'Show Deck'}
      </button>
      <div className="lista">
       
        {isCardsLoaded &&
          preMadeDeck.map(card => (
            <div className="card-wrapper" key={card.cardName}>
              <Used cardName={card.cardName} />
            </div>
          ))}
      </div>
    </div>
  );
};

export default DeckComponent;
