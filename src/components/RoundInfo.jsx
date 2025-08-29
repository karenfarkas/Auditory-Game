import React, { useEffect } from 'react';

export default function RoundInfo({ round, onNext }) {
  useEffect(() => {
    const audio = new Audio(`/audio/round${round}.mp3`);
    audio.play();
  }, [round]);

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h2>Round {round} Instructions</h2>
      <p>
        {round % 2 === 1
          ? "Listen carefully to the audio instruction."
          : "Simulating hearing difficulty. Watch carefully!"}
      </p>
      <button onClick={onNext}>Start Round</button>
    </div>
  );
}


