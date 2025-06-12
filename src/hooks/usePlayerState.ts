import { useState } from "react";
import { generatePlayerName } from "../utils/generateName";

export const usePlayerState = () => {
    const [name, setName] = useState(generatePlayerName());
    const [log, setLog] = useState<number[]>([]);
    const [history, setHistory] = useState<number[]>([0]);
    const [toggle, setToggle] = useState(false);
    const [input, setInput] = useState("");

    const score = history[history.length - 1];

    const reset = () => {
        setName(generatePlayerName());
        setLog([]);
        setHistory([0]);
        setToggle(false);
        setInput("");
    };

    const addPoints = (value: number, onWin: () => void) => {
        const newScore = Math.min(score + value, 121);
        setHistory([...history, score + value]);
        setLog(prev => [...prev, value]);
        setInput("");
        if (newScore >= 121) onWin();
    };

    const undo = () => {
        if (history.length > 1) {
            setHistory(history.slice(0, -1));
            setLog(log.slice(0, -1));
        }
    };

    return {
        name, setName,
        log, setLog,
        history, setHistory,
        toggle, setToggle,
        input, setInput,
        score,
        reset,
        addPoints,
        undo,
    };
};
