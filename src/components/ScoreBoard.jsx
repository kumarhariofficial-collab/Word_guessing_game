import React from 'react';

export default function ScoreBoard({ score, best, streak }) {
  return (
    <div className="score-bar">
      <div className="score-card">
        <div className="score-label">Score</div>
        <div className="score-value">{score}</div>
      </div>
      <div className="score-card best">
        <div className="score-label">Best</div>
        <div className="score-value">{best}</div>
      </div>
      <div className="score-card streak">
        <div className="score-label">Streak</div>
        <div className="score-value">{streak}🔥</div>
      </div>
    </div>
  );
}
