import React from 'react';

export default function Overlay({ show, win, points, reason, word, onPlayAgain, onClose }) {
  return (
    <div className={`overlay ${show ? 'show' : ''}`}>
      <div className="overlay-card">
        <span className="overlay-emoji">{win ? '🎉' : '😢'}</span>
        <div className={`overlay-title ${win ? 'win' : 'lose'}`}>
          {win ? 'YOU WON!' : 'GAME OVER'}
        </div>
        <div className="overlay-word">
          The word was: <strong>{word.toUpperCase()}</strong>
        </div>
        <div className="overlay-points">
          {win ? `+${points} points` : (reason === 'time' ? '⏱ Time up!' : (reason === 'gave up' ? '🏳 Gave up' : '💀 No lives left!'))}
        </div>
        <div className="overlay-btns">
          <button className="btn btn-primary" onClick={onPlayAgain}>▶ Play Again</button>
          <button className="btn btn-ghost" onClick={onClose}>✕ Close</button>
        </div>
      </div>
    </div>
  );
}
