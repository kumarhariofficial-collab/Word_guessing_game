import React from 'react';
import { sounds } from '../utils/audio';

export default function Header({ theme, setTheme, muted, setMuted, onShowLeaderboard }) {
  const toggleTheme = () => {
    sounds.click(muted);
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const toggleMute = () => {
    setMuted(!muted);
  };

  return (
    <header>
      <div className="logo">LEX<span>I</span>CON</div>
      <div className="header-controls">
        <button className="icon-btn" onClick={toggleMute} title="Toggle Sound">
          {muted ? '🔇' : '🔊'}
        </button>
        <button className="icon-btn" onClick={toggleTheme} title="Toggle Theme">
          {theme === 'dark' ? '🌙' : '☀️'}
        </button>
        <button className="icon-btn" onClick={onShowLeaderboard} title="Leaderboard">🏆</button>
      </div>
    </header>
  );
}
