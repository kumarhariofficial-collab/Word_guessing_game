import React from 'react';

export default function Leaderboard({ scores }) {
  return (
    <div className="leaderboard" id="leaderboardPanel">
      <div className="lb-title">🏆 High Scores</div>
      <div id="lbContent">
        {scores.length === 0 ? (
          <div className="no-scores">No scores yet. Play a game!</div>
        ) : (
          scores.map((s, i) => {
            const rank = i === 0 ? 'gold' : i === 1 ? 'silver' : i === 2 ? 'bronze' : '';
            const rankSymbol = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `#${i + 1}`;
            return (
              <div key={i} className="lb-row">
                <div className={`lb-rank ${rank}`}>{rankSymbol}</div>
                <div className="lb-name">{s.name} <span className="lb-diff">({s.diff})</span></div>
                <div className="lb-score">{s.pts}</div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
