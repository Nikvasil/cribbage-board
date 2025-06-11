import React from 'react';
import './App.css';
import {useState} from "react";
import {generatePlayerName} from "./utils/generateName";
import {controlValues} from "./data/controlValues";
import {CribbageBoard} from "./components/CribbageBoard";
import {PointLog} from "./components/PointLog";

function App() {
    const [winner, setWinner] = useState<string | null>(null);
    const [player1Name, setPlayer1Name] = useState(generatePlayerName());
    const [player2Name, setPlayer2Name] = useState(generatePlayerName());
    const [player1Log, setPlayer1Log] = useState<number[]>([]);
    const [player2Log, setPlayer2Log] = useState<number[]>([]);
    const [player1History, setPlayer1History] = useState<number[]>([0]);
    const [player2History, setPlayer2History] = useState<number[]>([0]);

    const player1Score = player1History[player1History.length - 1];
    const player2Score = player2History[player2History.length - 1];

    const resetGame = () => {
        setPlayer1History([0]);
        setPlayer2History([0]);
        setPlayer1Name(generatePlayerName());
        setPlayer2Name(generatePlayerName());
        setPlayer1Log([]);
        setPlayer2Log([]);
        setWinner(null);
    };

    const handleControl = (player: 1 | 2, label: string) => {
        if (winner) return;

        const value = controlValues[label.toUpperCase()] ?? parseInt(label, 10);
        if (isNaN(value)) return;

        if (player === 1) {
            const newScore = Math.min(player1Score + value, 121);
            setPlayer1History([...player1History, player1Score + value]);
            setPlayer1Log(prev => [...prev, value]);
            if (newScore >= 121) setWinner(player1Name);
        } else {
            const newScore = Math.min(player2Score + value, 121);
            setPlayer2History([...player2History, player2Score + value]);
            setPlayer2Log(prev => [...prev, value]);
            if (newScore >= 121) setWinner(player2Name);
        }
    };

    const handleUndo = (player: number) => {
        if (player === 1 && player1History.length > 1) {
            setPlayer1History(player1History.slice(0, -1));
            setPlayer1Log(player1Log.slice(0, -1));
        } else if (player === 2 && player2History.length > 1) {
            setPlayer2History(player2History.slice(0, -1));
            setPlayer2Log(player2Log.slice(0, -1));
        }
    };

  return (
      <>
      <div className={`app ${winner ? "fade" : ""}`}>
          <div className="player player-left">
              <div className="player-name">{player1Name}</div>
              <div className="counter">{player1Score}</div>
              <PointLog log={player1Log} />
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
                      <button className="control-btn return-btn" onClick={() => handleUndo(1)}>⟲</button>
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
              <PointLog log={player2Log} />
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
                      <button className="control-btn return-btn"  onClick={() => handleUndo(2)}>⟲</button>
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

