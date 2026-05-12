import React from 'react';
import { WORDS } from '../utils/words';
import { sounds } from '../utils/audio';

export default function SetupPanel({ difficulty, setDifficulty, category, setCategory, onNewWord, muted }) {
  const categories = Object.keys(WORDS);

  const handleDifficulty = (diff) => {
    sounds.click(muted);
    setDifficulty(diff);
  };

  const handleCategory = (cat) => {
    sounds.click(muted);
    setCategory(cat);
  };

  return (
    <div className="setup-panel">
      <div className="setup-group">
        <div className="setup-label">Difficulty</div>
        <div className="pill-group">
          <button className={`pill diff-easy ${difficulty === 'easy' ? 'active' : ''}`} onClick={() => handleDifficulty('easy')}>Easy</button>
          <button className={`pill diff-medium ${difficulty === 'medium' ? 'active' : ''}`} onClick={() => handleDifficulty('medium')}>Medium</button>
          <button className={`pill diff-hard ${difficulty === 'hard' ? 'active' : ''}`} onClick={() => handleDifficulty('hard')}>Hard</button>
        </div>
      </div>
      <div className="setup-group">
        <div className="setup-label">Category</div>
        <div className="pill-group">
          <button className={`pill ${category === 'all' ? 'active' : ''}`} onClick={() => handleCategory('all')}>All</button>
          {categories.map(cat => (
            <button key={cat} className={`pill ${category === cat ? 'active' : ''}`} onClick={() => handleCategory(cat)}>
              {cat.charAt(0).toUpperCase() + cat.slice(1)}
            </button>
          ))}
        </div>
      </div>
      <button className="btn btn-primary" onClick={onNewWord}>▶ New Word</button>
    </div>
  );
}
