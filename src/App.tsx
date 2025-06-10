import React from 'react';
import './App.css';
import {useState} from "react";
import {generatePlayerName} from "./utils/generateName";
import {controlValues} from "./data/controlValues";
import {CribbageBoard} from "./components/CribbageBoard";

function App() {
    const [winner, setWinner] = useState<string | null>(null);
    const [player1Name, setPlayer1Name] = useState(generatePlayerName());
    const [player2Name, setPlayer2Name] = useState(generatePlayerName());
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

    const resetGame = () => {
        setPlayer1Score(0);
        setPlayer2Score(0);
        setPlayer1Name(generatePlayerName());
        setPlayer2Name(generatePlayerName());
        setWinner(null);
    };

    const handleControl = (player: 1 | 2, label: string) => {
        const value = controlValues[label.toUpperCase()] ?? parseInt(label, 10);
        if (player === 1) {
            setPlayer1Score(prev => {
                const updated = prev + value;
                if (updated >= 121) setWinner(player1Name);
                return Math.min(updated, 121);
            });
        } else {
            setPlayer2Score(prev => {
                const updated = prev + value;
                if (updated >= 121) setWinner(player2Name);
                return Math.min(updated, 121);
            });
        }
    };

  return (
      <>
      <div className={`app ${winner ? "fade" : ""}`}>
          <div className="player player-left">
              <div className="player-name">{player1Name}</div>
              <div className="counter">{player1Score}</div>
              <CribbageBoard score={player1Score}/>
              <div className="controls">
                  <div className="controls-row">
                      <div className="preset-grid">
                          {["JACK START", "JACK HAND", "GO", "15", "PAIR", "31"].map((label) => (
                              <button key={label} className="control-btn"
                                      onClick={() => handleControl(1, label)}>{label}</button>
                          ))}
                      </div>
                      <div className="numpad-grid">
                          {Array.from({length: 9}, (_, i) => (
                              <button key={i + 1} className="control-btn"
                                      onClick={() => handleControl(1, String(i + 1))}>{i + 1}</button>
                          ))}
                      </div>
                      <button className="control-btn return-btn">⟲</button>
                  </div>
              </div>
              <div className="toggle-wrapper">
                  <label className="toggle-switch">
                      <input type="checkbox"/>
                      <span className="slider"></span>
                  </label>
              </div>
          </div>
          <div className="divider"/>
          <div className="player player-right">
              <div className="player-name">{player2Name}</div>
              <div className="counter">{player2Score}</div>
              <CribbageBoard score={player2Score}/>
              <div className="controls">
                  <div className="controls-row">
                      <div className="preset-grid">
                          {["JACK START", "JACK HAND", "GO", "15", "PAIR", "31"].map((label) => (
                              <button key={label} className="control-btn"
                                      onClick={() => handleControl(2, label)}>{label}</button>
                          ))}
                      </div>
                      <div className="numpad-grid">
                          {Array.from({length: 9}, (_, i) => (
                              <button key={i + 1} className="control-btn"
                                      onClick={() => handleControl(2, String(i + 1))}>{i + 1}</button>
                          ))}
                      </div>
                      <button className="control-btn return-btn">⟲</button>
                  </div>
              </div>
              <div className="toggle-wrapper">
                  <label className="toggle-switch">
                      <input type="checkbox"/>
                      <span className="slider"></span>
                  </label>
              </div>
          </div>
      </div>
          {winner && <div className="overlay"></div>}

          {winner && (
              <div className="winner-overlay">
                  <div>{winner} wins!</div>
                  <button onClick={resetGame}>New Game</button>
              </div>
          )}
      </>
  );
}

export default App;

