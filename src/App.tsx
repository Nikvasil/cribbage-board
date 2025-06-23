import React, { useState } from "react";
import './App.css';
import { PlayerPanel } from "./components/PlayerPanel";
import { usePlayerState } from "./hooks/usePlayerState";
import { controlValues } from "./data/controlValues";
import {generatePlayerName} from "./utils/generateName";

function App() {
    const p1 = usePlayerState();
    const p2 = usePlayerState();
    const [winner, setWinner] = useState<string | null>(null);

    const handleControl = (player: 1 | 2, label: string) => {
        if (winner) return;
        const state = player === 1 ? p1 : p2;
        const isToggleOn = state.toggle;

        if (isToggleOn && /^\d$/.test(label)) {
            state.setInput((prev: string) => {
                if (prev === "" && label === "0") return prev;
                return (prev + label).slice(0, 3);
            });
            return;
        }

        if (isToggleOn && label === "←") {
            state.setInput((prev: string) => prev.slice(0, -1));
            return;
        }

        const value = controlValues[label.toUpperCase()] ?? parseInt(label, 10);
        if (!isNaN(value)) {
            state.addPoints(value, () => setWinner(state.name));
        }
    };

    const handleSubmitInput = (player: number) => {
        const state = player === 1 ? p1 : p2;
        const value = parseInt(state.input, 10);
        if (!isNaN(value)) {
            state.addPoints(value, () => setWinner(state.name));
        }
    };

    const handleUndo = (player: number) => {
        const state = player === 1 ? p1 : p2;
        state.undo();
    };

    const handleNameGenerator = (player: number) => {
        const state = player === 1 ? p1 : p2;
        state.setName(generatePlayerName);
    };

    const resetGame = () => {
        p1.reset();
        p2.reset();
        setWinner(null);
    };

    return (
        <>
            <div className={`app ${winner ? "fade" : ""}`}>
                <PlayerPanel
                    id={1}
                    state={p1}
                    handleControl={handleControl}
                    handleSubmitInput={handleSubmitInput}
                    handleUndo={handleUndo}
                    handleNameGenerator={handleNameGenerator}
                />
                <div className="divider" />
                <PlayerPanel
                    id={2}
                    state={p2}
                    handleControl={handleControl}
                    handleSubmitInput={handleSubmitInput}
                    handleUndo={handleUndo}
                    handleNameGenerator={handleNameGenerator}
                />
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
