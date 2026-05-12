import React, { useEffect } from 'react';

const ROWS = ['QWERTYUIOP', 'ASDFGHJKL', 'ZXCVBNM'];

export default function Keyboard({ guessed, word, onGuess, gameActive }) {

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!gameActive) return;
      if (e.key.length === 1 && e.key.match(/[a-z]/i)) {
        onGuess(e.key.toLowerCase());
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameActive, onGuess]);

  return (
    <div className="keyboard">
      {ROWS.map((row, i) => (
        <div key={i} className="kb-row">
          {[...row].map(letter => {
            const l = letter.toLowerCase();
            const isGuessed = guessed.has(l);
            const isCorrect = isGuessed && word.includes(l);
            const isWrong = isGuessed && !word.includes(l);

            return (
              <button
                key={letter}
                className={`kb-key ${isCorrect ? 'correct' : ''} ${isWrong ? 'wrong' : ''}`}
                disabled={!gameActive || isGuessed}
                onClick={() => onGuess(l)}
              >
                {letter}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
