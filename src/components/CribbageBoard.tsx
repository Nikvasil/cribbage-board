import React from 'react';

type Props = {
    score: number;
};

export const CribbageBoard: React.FC<Props> = ({ score }) => {
    const layout = [41, 41, 39];
    let dotIndex = 0;

    return (
        <div className="cribbage-board">
            {layout.map((count, lineIdx) => (
                <div key={lineIdx} className="crib-line">
                    {Array.from({ length: count }).map((_, i) => {
                        const filled = dotIndex < score;
                        dotIndex++;
                        return (
                            <div
                                key={i}
                                className="crib-dot"
                                style={{ backgroundColor: filled ? "white" : "#444" }}
                            />
                        );
                    })}
                </div>
            ))}
        </div>
    );
};
