import React, { useState, useEffect, useCallback } from 'react';
import Header from './components/Header';
import ScoreBoard from './components/ScoreBoard';
import SetupPanel from './components/SetupPanel';
import GameBoard from './components/GameBoard';
import Keyboard from './components/Keyboard';
import Overlay from './components/Overlay';
import Leaderboard from './components/Leaderboard';
import Toast from './components/Toast';
import { WORDS, HINTS, diffConfig } from './utils/words';
import { sounds, launchConfetti } from './utils/audio';

function App() {
  const [theme, setTheme] = useState('dark');
  const [muted, setMuted] = useState(false);
  const [toast, setToast] = useState({ message: '', type: '', time: 0 });

  // Game Settings
  const [difficulty, setDifficulty] = useState('easy');
  const [category, setCategory] = useState('technology');

  // Game State
  const [word, setWord] = useState('');
  const [guessed, setGuessed] = useState(new Set());
  const [lives, setLives] = useState(6);
  const [maxLives, setMaxLives] = useState(6);
  const [score, setScore] = useState(0);
  const [best, setBest] = useState(() => parseInt(localStorage.getItem('lexicon_best') || '0'));
  const [streak, setStreak] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [hintText, setHintText] = useState('');

  // Timer State
  const [timeLeft, setTimeLeft] = useState(0);
  const [maxTime, setMaxTime] = useState(0);

  // Leaderboard State
  const [scores, setScores] = useState(() => JSON.parse(localStorage.getItem('lexicon_scores') || '[]'));

  // Overlay State
  const [overlay, setOverlay] = useState({ show: false, win: false, points: 0, reason: '' });

  const showToast = (message, type = '') => {
    setToast({ message, type, time: Date.now() });
  };

  const pickWord = useCallback(() => {
    let pool = [];
    const cats = category === 'all' ? Object.keys(WORDS) : [category];
    cats.forEach(cat => {
      const arr = WORDS[cat]?.[difficulty];
      if (arr) arr.forEach(w => pool.push({ word: w, cat }));
    });
    return pool[Math.floor(Math.random() * pool.length)];
  }, [category, difficulty]);

  const newGame = () => {
    const picked = pickWord();
    if (!picked) {
      showToast('No words found!', 'error');
      return;
    }
    const cfg = diffConfig[difficulty];
    setWord(picked.word.toLowerCase());
    setCategory(picked.cat);
    setGuessed(new Set());
    setLives(cfg.lives);
    setMaxLives(cfg.lives);
    setHintsUsed(0);
    setGameActive(true);
    setHintText('');
    setOverlay({ ...overlay, show: false });
    
    setTimeLeft(cfg.time);
    setMaxTime(cfg.time);
  };

  // Timer Effect
  useEffect(() => {
    let timerId = null;
    if (gameActive && timeLeft > 0) {
      timerId = setInterval(() => {
        setTimeLeft(t => {
          if (t <= 11) sounds.timer(muted); // play at 10s and below (t <= 11 because we decrement)
          if (t <= 1) {
            handleTimeUp();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [gameActive, timeLeft, muted]);

  const handleTimeUp = () => {
    setGameActive(false);
    sounds.lose(muted);
    endGame(false, 'time');
  };

  const calcPoints = (correctLetters) => {
    const cfg = diffConfig[difficulty];
    let pts = correctLetters * cfg.pointsPerLetter;
    pts += timeLeft * cfg.bonusTime;
    pts += lives * 10;
    if (hintsUsed === 0) pts += 50;
    pts = Math.round(pts * (1 + streak * 0.1));
    return Math.max(0, pts);
  };

  const saveScore = (pts) => {
    const newEntry = { name: 'You', pts, diff: difficulty, cat: category, time: Date.now() };
    const newScores = [newEntry, ...scores].sort((a, b) => b.pts - a.pts).slice(0, 10);
    setScores(newScores);
    localStorage.setItem('lexicon_scores', JSON.stringify(newScores));
  };

  const winGame = () => {
    setGameActive(false);
    const correctLettersCount = [...new Set([...word].filter(c => c !== ' '))].length;
    const pts = calcPoints(correctLettersCount);
    const newScore = score + pts;
    setScore(newScore);
    setStreak(s => s + 1);
    
    if (newScore > best) {
      setBest(newScore);
      localStorage.setItem('lexicon_best', newScore);
    }
    
    saveScore(pts);
    sounds.win(muted);
    launchConfetti();
    setTimeout(() => setOverlay({ show: true, win: true, points: pts, reason: '' }), 400);
  };

  const endGame = (win, reason = '') => {
    setGameActive(false);
    setStreak(0);
    sounds.lose(muted);
    setTimeout(() => setOverlay({ show: true, win: false, points: 0, reason }), 400);
  };

  const handleGuess = useCallback((letter) => {
    if (!gameActive || guessed.has(letter)) return;
    sounds.click(muted);
    
    const newGuessed = new Set(guessed);
    newGuessed.add(letter);
    setGuessed(newGuessed);

    if (word.includes(letter)) {
      sounds.correct(muted);
      showToast('✓ Correct!', 'success');
      
      const allGuessed = [...word].every(c => c === ' ' || newGuessed.has(c));
      if (allGuessed) {
        // use setTimeout so state update has time to render
        setTimeout(winGame, 100);
      }
    } else {
      sounds.wrong(muted);
      showToast('✗ Wrong!', 'error');
      setLives(l => {
        const newLives = l - 1;
        if (newLives <= 0) {
          endGame(false, 'lives');
        }
        return newLives;
      });
      // trigger shake animation on word element (optional, implemented via ref in GameBoard if needed)
    }
  }, [gameActive, guessed, word, muted]);

  const giveUp = () => {
    if (!gameActive) return;
    sounds.click(muted);
    endGame(false, 'gave up');
  };

  const skipWord = () => {
    if (!gameActive) return;
    sounds.click(muted);
    setStreak(0);
    setScore(Math.max(0, score - 100));
    showToast('Word skipped! –100 pts', 'error');
    newGame();
  };

  const useHint = () => {
    if (!gameActive || hintsUsed >= 3) return;
    sounds.hint(muted);
    const unguessed = [...word].filter(c => c !== ' ' && !guessed.has(c));
    if (unguessed.length === 0) {
      showToast('All letters already shown!');
      return;
    }
    const letter = unguessed[Math.floor(Math.random() * unguessed.length)];
    
    const newGuessed = new Set(guessed);
    newGuessed.add(letter);
    setGuessed(newGuessed);
    
    setHintsUsed(h => h + 1);
    setScore(s => Math.max(0, s - 50));
    showToast(`💡 Hint: "${letter.toUpperCase()}" revealed`, 'success');
    
    const h = HINTS[category]?.[word];
    if (h) setHintText('💬 ' + h);
    
    const allGuessed = [...word].every(c => c === ' ' || newGuessed.has(c));
    if (allGuessed) setTimeout(winGame, 100);
  };

  const scrollToLeaderboard = () => {
    sounds.click(muted);
    document.getElementById('leaderboardPanel')?.scrollIntoView({ behavior: 'smooth' });
  };

  const timerPct = maxTime > 0 ? (timeLeft / maxTime) * 100 : 0;

  return (
    <>
      <canvas id="confetti"></canvas>
      <Toast message={toast.message} type={toast.type} showTime={toast.time} />
      <Overlay 
        {...overlay} 
        word={word} 
        onPlayAgain={newGame} 
        onClose={() => setOverlay({ ...overlay, show: false })} 
      />

      <div className="container">
        <Header 
          theme={theme} setTheme={setTheme} 
          muted={muted} setMuted={setMuted} 
          onShowLeaderboard={scrollToLeaderboard} 
        />
        
        <ScoreBoard score={score} best={best} streak={streak} />

        <SetupPanel 
          difficulty={difficulty} setDifficulty={setDifficulty}
          category={category} setCategory={setCategory}
          onNewWord={newGame}
          muted={muted}
        />

        <div className="timer-wrap">
          <span className="timer-icon">⏱</span>
          <div className="timer-track">
            <div className={`timer-fill ${timerPct < 30 ? 'warning' : ''}`} style={{ width: `${timerPct}%` }}></div>
          </div>
          <div className={`timer-count ${(timeLeft <= 10 && gameActive) ? 'pulse' : ''}`}>{timeLeft}s</div>
        </div>

        <GameBoard 
          word={word} 
          guessed={guessed} 
          gameActive={gameActive} 
          category={category} 
          difficulty={difficulty}
          hintText={hintText}
          lives={lives}
          maxLives={maxLives}
        />

        <Keyboard 
          guessed={guessed} 
          word={word} 
          onGuess={handleGuess} 
          gameActive={gameActive} 
        />

        <div className="action-row">
          <button className="btn btn-ghost" onClick={useHint} disabled={!gameActive || hintsUsed >= 3}>
            💡 Hint (–50pts)
          </button>
          <button className="btn btn-ghost" onClick={skipWord} disabled={!gameActive}>
            ⏭ Skip Word
          </button>
          <button className="btn btn-danger" onClick={giveUp} disabled={!gameActive}>
            🏳 Give Up
          </button>
        </div>

        <Leaderboard scores={scores} />
      </div>
    </>
  );
}

export default App;
