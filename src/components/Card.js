import React, { useState, useEffect } from 'react';
import { fetchCardData } from './api';
import './card.css';


const Card = () => {
  const [cardData, setCardData] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [error, setError] = useState(null);
  const [deck, setDeck] = useState([]);
  const [extraDeck, setExtraDeck] = useState([]);
  const [searchInput, setSearchInput] = useState('');
  const [combinedDeck, setCombinedDeck] = useState([]);
  const [deckName, setDeckName] = useState('');




  useEffect(() => {
    const deckData = localStorage.getItem('deck');
    if (deckData) {
      const parsedDeckData = JSON.parse(deckData);
      if (Array.isArray(parsedDeckData.deck) && Array.isArray(parsedDeckData.extraDeck)) {
        setDeckName(parsedDeckData.deckName ?? '');
        setCombinedDeck(parsedDeckData);
        setDeck([]);
        setExtraDeck([]);
      } else {
        setError('Deck data is not available.');
      }
    } else {
      localStorage.setItem('deck', JSON.stringify({ deck: [], extraDeck: [] }));
      setDeck([]);
      setExtraDeck([]);
    }
  
    const storedDeckName = localStorage.getItem('deckName');
    if (storedDeckName && storedDeckName !== deckName) {
      setDeckName(storedDeckName);
    }
  }, []);
  

useEffect(() => {
  if (deckName) {
    localStorage.setItem('deckName', deckName);
  }
}, [deckName]);

useEffect(() => {
  const fetchCardInfo = async () => {
    try {
      const response = await fetchCardData();
      if (Array.isArray(response)) {
        setCardData(response);
      } else {
        setError('Card data is not available.');
      }
    } catch (error) {
      setError(error.message);
    }
  };
  fetchCardInfo();
}, []);
  
  

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };


  const handleModalClose = () => {
    setSelectedCard(null);
    setError(null);
  };


  const handleAddToDeck = (card) => {
    const existingCard = deck.find((c) => c.id === card.id);
    const existingExtraDeckCard = extraDeck.find((c) => c.id === card.id);
  
    if (
      card.type.includes('Fusion') ||
      card.type.includes('Synchro') ||
      card.type.includes('XYZ') ||
      card.type.includes('Link')
    ) {
      const totalExtraDeckCount = extraDeck.reduce((acc, c) => acc + c.count, 0);
      if (totalExtraDeckCount >= 15) {
        alert('Maximum limit of 15 cards reached in Extra Deck!');
        return;
      }
  
      if (existingExtraDeckCard && existingExtraDeckCard.count < 3) {
        const updatedExtraDeck = extraDeck.map((c) =>
          c.id === card.id ? { ...c, count: c.count + 1 } : c
        );
        setExtraDeck(updatedExtraDeck);
      } else if (!existingExtraDeckCard && extraDeck.length < 15) {
        const newCard = { ...card, count: 1 };
        setExtraDeck([...extraDeck, newCard]);
      } else {
        alert('You can only add up to 3 cards to your extra deck or it has reached the maximum limit of 15 cards.');
      }
    } else {
      const totalMainDeckCount = deck.reduce((acc, c) => acc + c.count, 0);
      if (totalMainDeckCount >= 60) {
        alert('Maximum limit of 60 cards reached in Main Deck!');
        return;
      }
  
      if (existingCard && existingCard.count < 3) {
        const updatedDeck = deck.map((c) =>
          c.id === card.id ? { ...c, count: c.count + 1 } : c
        );
        setDeck(updatedDeck);
      } else if (!existingCard && deck.length < 60) {
        const newCard = { ...card, count: 1 };
        setDeck([...deck, newCard]);
      } else {
        alert('You can only add up to 3 cards of the same type to your deck or it has reached the maximum limit of 60 cards.');
      }
    }
  };
  
  const handleRemoveFromDeck = (card) => {
    const updatedDeck = deck.filter((c) => c.id !== card.id);
    setDeck(updatedDeck);
  
    const updatedCombinedDeck = { ...combinedDeck };
    updatedCombinedDeck.deck = updatedDeck;
    setCombinedDeck(updatedCombinedDeck);
  };
  
  const handleRemoveFromExtraDeck = (card) => {
    const updatedExtraDeck = extraDeck.filter((c) => c.id !== card.id);
    setExtraDeck(updatedExtraDeck);
  
    const updatedCombinedDeck = { ...combinedDeck };
    updatedCombinedDeck.extraDeck = updatedExtraDeck;
    setCombinedDeck(updatedCombinedDeck);
  };
  
  const handleSingleRemoveFromDeck = (card) => {
    const existingCard = deck.find((c) => c.id === card.id);
    if (existingCard && existingCard.count > 0) {
      const updatedDeck = deck.map((c) =>
        c.id === card.id && c.count > 0 ? { ...c, count: c.count - 1 } : c
      );
      setDeck(updatedDeck);
  
      const updatedCombinedDeck = { ...combinedDeck };
      updatedCombinedDeck.deck = updatedDeck;
      setCombinedDeck(updatedCombinedDeck);
  
      if (existingCard.count === 1) {
        handleRemoveFromDeck(card);
      }
    }
  };

  const handleEmptyDeck = () => {
    setDeck([]);
    setExtraDeck([]);
    setCombinedDeck({ deck: [], extraDeck: [] });
  };
  
 
 

  const handleSaveDeck = () => {
  if (deck.length > 60) {
    alert('You can only have up to 60 cards in your main deck.');
    return;
  } else if (extraDeck.length > 15) {
    alert('You can only have up to 15 cards in your extra deck.');
    return;
  } else {
    const totalDeck = { deck: deck, extraDeck: extraDeck };
    const name = prompt('Enter a name for your deck (maximum 30 characters):');
    if (!name) {
      alert('Please enter a valid name for your deck.');
      return;
    } else if (name.length > 30) {
      alert('Deck name must be maximum 30 characters.');
      return;
    }
    console.log('Deck name:', name);
    setDeckName(name);
    localStorage.setItem('deckName', name); 
    setCombinedDeck(totalDeck);
    localStorage.setItem('deck', JSON.stringify(totalDeck)); 
    alert('Deck has been saved to local storage.');
    setDeck([]);
    setExtraDeck([]);
    localStorage.removeItem('mainDeck');
    localStorage.removeItem('extraDeck');
  
      const retrievedMainDeck = JSON.parse(localStorage.getItem('mainDeck'));
      const retrievedExtraDeck = JSON.parse(localStorage.getItem('extraDeck'));
      if (retrievedMainDeck) {
        setDeck(retrievedMainDeck);
      }
      if (retrievedExtraDeck) {
        setExtraDeck(retrievedExtraDeck);
      }
    }
  };
  
  
  
  
  
  console.log('cardData:', cardData);
  console.log('deck:', deck);


  if (error) {
    return <p>Error fetching card data: {error}</p>;
  }


  if (cardData.length === 0) {
    return <p>Loading card data...</p>;
  }


  return (
    <div>
      <input
        type="text"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        placeholder="Search cards..."
        className="search-input"
      />
      <div className="card-display">
        {cardData
          .filter((card) =>
            card.name.toLowerCase().includes(searchInput.toLowerCase())
          )
          .map((card) => (
            <img
              key={card.id}
              src={card.card_images[0]?.image_url_small}
              alt={card.name}
              onClick={() => handleCardClick(card)}
              className="card-image"
            />
          ))}
      </div>
      {selectedCard && (
        <div className="card-modal active">
          <div className="card-modal-content">
            <h3>Card Details</h3>
            <img
              src={selectedCard.card_images[0]?.image_url}
              alt={selectedCard.name}
              className="card-modal-image"
            />
            <p className='yu-card'>Name: {selectedCard.name}</p>
            <p className='yu-card'>Description: {selectedCard.desc}</p>
            <p className='yu-card'>Type: {selectedCard.type}</p>
            <p className='yu-card'>Race: {selectedCard.race}</p>
            {selectedCard.type.includes('Monster') && (
              <React.Fragment>
                <p className='yu-card'>Attribute: {selectedCard.attribute}</p>
                <p className='yu-card'>Level/Rank: {selectedCard.level}</p>
                <p className='yu-card'>Attack: {selectedCard.atk}</p>
                {selectedCard.type === 'Link Monster' ? (
                  <React.Fragment>
                    <p className='yu-card'>Link Value: {selectedCard.linkval}</p>
                    <p className='yu-card'>Link Markers: {selectedCard.linkmarkers.join(', ')}</p>
                  </React.Fragment>
                ) : (
                  <p className='yu-card'>Defense: {selectedCard.def}</p>
                )}
              </React.Fragment>
            )}
          {deck.filter((card) => card.id === selectedCard.id).length >= 3 ? (
            <button className="add-to-deck-btn" disabled>
              Add to Deck (Limit reached)
            </button>
          ) : (
            <button
              className="add-to-deck-btn"
              onClick={() => handleAddToDeck(selectedCard)}
            >
              Add to Deck
            </button>
           
          )}
          <button
          className="remove-from-deck-btn"
          onClick={() => handleSingleRemoveFromDeck(selectedCard)}
          >
            Remove from Deck


          </button>
          <button className="close-modal-btn" onClick={handleModalClose}>
            Close
          </button>
        </div>
      </div>
    )}
    <div className="deck" id="deck">
  <h2 className='deck-title'>Main Deck</h2>
  {deckName !== '' && deck.length > 0 ? (
    <div>
      {deck.map((card) => (
        <div key={card.id} className="deck-card">
          <img
            src={card.card_images[0]?.image_url_small}
            alt={card.name}
            className="deck-card-image"
            onClick={() => handleCardClick(card)}
          />
          <p>{card.name}</p>
          <p>Count: {card.count}</p>
          <button
            className="remove-from-deck-btn"
            onClick={() => handleRemoveFromDeck(card)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  ) : (
    <p className='main-deck-p'>{deckName !== '' ? 'No cards in the main deck.' : 'Main deck not saved.'}</p>
  )}
</div>


<div className="extra-deck">
  <h2 className='extra-deck-title'>Extra Deck</h2>
  {deckName !== '' && extraDeck.length > 0 ? (
    <div className="extra-deck-card-container">
      {extraDeck.map((card) => (
        <div key={card.id} className="extra-deck-card">
          <img
            src={card.card_images[0]?.image_url_small}
            alt={card.name}
            className="extra-deck-card-image"
            onClick={() => handleCardClick(card)}
          />
          <p className="extra-deck-card-name">{card.name}</p>
          <p className="extra-deck-card-count">Count: {card.count}</p>
          <button
            className="remove-from-deck-btn"
            onClick={() => handleRemoveFromExtraDeck(card)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  ) : (
    <p className='extra-deck-p'>{deckName !== '' ? 'No cards in the extra deck.' : 'Extra deck not saved.'}</p>
  )}

<div className="deck-box">
  <h2 className="deck-box-title">Deck Box</h2>
  <p className="deck-box-deck-name">Deck Name: {deckName}</p>
  {combinedDeck.deck.length > 0 || combinedDeck.extraDeck.length > 0 ? (
    <div className="deck-box-card-container">
      {combinedDeck.deck.map((card) => (
        <div key={card.id} className="deck-box-card">
          <img
            src={card.card_images[0]?.image_url_small}
            alt={card.name}
            className="deck-box-card-image"
            onClick={() => handleCardClick(card)}
          />
          <p className="deck-box-card-name">{card.name}</p>
          <p className="deck-box-card-count">Count: {card.count}</p>
          <button
            className="remove-from-deck-btn"
            onClick={() => handleRemoveFromDeck(card)}
          >
            Remove
          </button>
        </div>
      ))}
      {combinedDeck.extraDeck.map((card) => (
        <div key={card.id} className="deck-box-card">
          <img
            src={card.card_images[0]?.image_url_small}
            alt={card.name}
            className="deck-box-card-image"
            onClick={() => handleCardClick(card)}
          />
          <p className="deck-box-card-name">{card.name}</p>
          <p className="deck-box-card-count">Count: {card.count}</p>
          <button
            className="remove-from-deck-btn"
            onClick={() => handleRemoveFromExtraDeck(card)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  ) : (
    <p className="no-cards-msg">No cards in the combined deck.</p>
  )}
  <button className="empty-deck-btn" onClick={handleEmptyDeck}>
    Empty Deck
  </button>
  
</div>
    </div>
    <button className="save-deck-btn" onClick={handleSaveDeck}>
    Save Deck
  </button>
  </div>
);}


export default Card;