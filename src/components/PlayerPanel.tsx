import React from "react";
import { CribbageBoard } from "./CribbageBoard";
import { PointLog } from "./PointLog";
import { ControlPanel } from "./ControlPanel";

export const PlayerPanel = ({
                                id,
                                state,
                                handleControl,
                                handleSubmitInput,
                                handleUndo
                            }: {
    id: 1 | 2;
    state: any;
    handleControl: (player: 1 | 2, label: string) => void;
    handleSubmitInput: (player: number) => void;
    handleUndo: (player: number) => void;
}) => (
    <div className={`player ${id === 1 ? "player-left" : "player-right"}`}>
        <div className="player-name">{state.name}</div>
        <div className="counter">{state.score}</div>
        {state.toggle && (
            <div className="manual-input-display">
                {state.input ? `+${state.input}` : ""}
            </div>
        )}
        <PointLog log={state.log}/>
        <CribbageBoard score={state.score}/>
        <ControlPanel
            player={id}
            toggle={state.toggle}
            handleControl={handleControl}
            handleUndo={handleUndo}
            handleSubmitInput={handleSubmitInput}
        />
        <div className="toggle-section">
            <div className="toggle-label">Scoring</div>
            <label className="toggle-switch">
                <input
                    type="checkbox"
                    checked={state.toggle}
                    onChange={() => state.setToggle(!state.toggle)}
                />
                <span className="slider"></span>
            </label>
            <div className="toggle-label">Play</div>
        </div>
    </div>
);
