import React, { useState } from 'react';
import Game from './components/Game.jsx';
import RoundInfo from './components/RoundInfo.jsx';

export default function App() {
  const [round, setRound] = useState(1);
  const [showInstructions, setShowInstructions] = useState(true);

  const nextRound = () => {
    if (round < 4) {
      setRound(round + 1);
      setShowInstructions(true);
    } else {
      alert("Game Over!");
    }
  };

  return (
    <>
      {showInstructions ? (
        <RoundInfo round={round} onNext={() => setShowInstructions(false)} />
      ) : (
        <Game round={round} onRoundComplete={nextRound} />
      )}
    </>
  );
}
