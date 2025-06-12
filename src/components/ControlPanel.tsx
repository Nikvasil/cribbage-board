export const ControlPanel = ({
                                 player,
                                 toggle,
                                 handleControl,
                                 handleSubmitInput,
                                 handleUndo
                             }: {
    player: 1 | 2;
    toggle: boolean;
    handleControl: (player: 1 | 2, label: string) => void;
    handleSubmitInput: (player: number) => void;
    handleUndo: (player: number) => void;
}) => (
    <div className="controls">
        <div className="controls-row">
            <div className={`input-grids ${toggle ? "centered" : ""}`}>
                {!toggle && (
                    <div className="preset-grid">
                        {["JACK START", "JACK HAND", "GO", "15", "PAIR", "31"].map((label) => (
                            <button
                                key={label}
                                className="control-btn"
                                onClick={() => handleControl(player, label)}
                            >
                                {label}
                            </button>
                        ))}
                    </div>
                )}
                <div className="numpad-grid">
                    {Array.from({length: 9}, (_, i) => (
                        <button
                            key={i + 1}
                            className="control-btn"
                            onClick={() => handleControl(player, String(i + 1))}
                        >
                            {i + 1}
                        </button>
                    ))}
                </div>
            </div>
            <div className="control-buttons-wrapper">
                {toggle && (
                    <div className="button-column">
                        <div className="erase-btn-wrapper">
                            <button className="control-btn erase-btn" onClick={() => handleControl(player, "←")}>←
                            </button>
                        </div>
                        <div className="zero-btn-wrapper">
                            <button className="control-btn zero-btn"
                                    onClick={() => handleControl(player, String(0))}>0
                            </button>
                        </div>
                        <div className="input-btn-wrapper">
                            <button className="control-btn input-btn" onClick={() => handleSubmitInput(player)}>→
                            </button>
                        </div>
                    </div>
                )}
                <button className="control-btn return-btn" onClick={() => handleUndo(player)}>⟲</button>
            </div>
        </div>
    </div>
);
