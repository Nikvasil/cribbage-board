import React from 'react';
import './App.css';
import {useState} from "react";
import {generatePlayerName} from "./utils/generateName";
import {controlValues} from "./data/controlValues";

function App() {
    const [player1Name] = useState(generatePlayerName());
    const [player2Name] = useState(generatePlayerName());
    const [player1Score, setPlayer1Score] = useState(0);
    const [player2Score, setPlayer2Score] = useState(0);

    const handleControl = (player: 1 | 2, label: string) => {
        const value = controlValues[label.toUpperCase()] ?? parseInt(label, 10);
        if (!isNaN(value)) {
            if (player === 1) setPlayer1Score((prev) => prev + value);
            else setPlayer2Score((prev) => prev + value);
        }
    };
  return (
      <div className="app">
          <div className="player player-left">
              <div className="player-name">{player1Name}</div>
              <div className="counter">{player1Score}</div>
              <div className="cribbage-board">
                  {[41, 41, 39].map((count, i) => (
                      <div className="crib-line" key={i}>
                          {Array.from({length: count}).map((_, j) => (
                              <div className="crib-dot" key={j}/>
                          ))}
                      </div>
                  ))}
              </div>
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
              <div className="cribbage-board">
                  {[41, 41, 39].map((count, i) => (
                      <div className="crib-line" key={i}>
                          {Array.from({length: count}).map((_, j) => (
                              <div className="crib-dot" key={j}/>
                          ))}
                      </div>
                  ))}
              </div>
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
  );
}

export default App;

