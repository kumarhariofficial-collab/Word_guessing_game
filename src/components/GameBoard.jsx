import React from 'react';

export default function GameBoard({ word, guessed, gameActive, category, difficulty, hintText, lives, maxLives }) {
  
  const hearts = Array.from({ length: maxLives }, (_, i) => i < lives);

  return (
    <div className="word-area">
      <div className="category-badge">
        {gameActive 
          ? `${category.charAt(0).toUpperCase() + category.slice(1)} — ${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}`
          : "Choose difficulty & press New Word"}
      </div>

      <div className="word-display">
        {!gameActive && word === "" && (
          <div style={{ color: 'var(--text-dim)', fontSize: '0.9rem', padding: '20px' }}>
            Press <strong style={{ color: 'var(--accent)' }}>▶ New Word</strong> to begin
          </div>
        )}
        {(gameActive || word !== "") && [...word].map((ch, i) => {
          if (ch === ' ') {
            return <div key={i} style={{ width: '20px', display: 'inline-block' }}></div>;
          }
          const isRevealed = guessed.has(ch) || !gameActive; // Reveal if guessed or game over
          return (
            <div key={i} className={`letter-box ${isRevealed ? 'active' : ''}`}>
              <div className={`letter-char ${isRevealed ? 'reveal' : 'blank'}`}>
                {isRevealed ? ch.toUpperCase() : '_'}
              </div>
              <div className="letter-line"></div>
            </div>
          );
        })}
      </div>

      <div className="hint-text">{hintText}</div>

      <div className="lives-row">
        {hearts.map((isAlive, i) => (
          <div key={i} className={`heart ${!isAlive ? 'lost' : ''}`}>❤️</div>
        ))}
      </div>
    </div>
  );
}
