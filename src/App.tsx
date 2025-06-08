import React from 'react';
import './App.css';

function App() {
  return (
      <div className="app">
          <div className="player player-left">
              <div className="player-name">Green Giraffe</div>
              <div className="counter">0</div>
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
                              <button key={label} className="control-btn">{label}</button>
                          ))}
                      </div>
                      <div className="numpad-grid">
                          {Array.from({length: 9}, (_, i) => (
                              <button key={i + 1} className="control-btn">{i + 1}</button>
                          ))}
                      </div>
                      <button className="control-btn return-btn">⟲</button>
                  </div>
              </div>
          </div>
          <div className="divider"/>
          <div className="player player-right">
              <div className="player-name">Orange Rhino</div>
              <div className="counter">0</div>
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
                              <button key={label} className="control-btn">{label}</button>
                          ))}
                      </div>
                      <div className="numpad-grid">
                          {Array.from({length: 9}, (_, i) => (
                              <button key={i + 1} className="control-btn">{i + 1}</button>
                          ))}
                      </div>
                      <button className="control-btn return-btn">⟲</button>
                  </div>
              </div>
          </div>
      </div>
  );
}

export default App;

