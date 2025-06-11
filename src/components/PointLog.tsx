import React from 'react';

export const PointLog = ({ log }: { log: number[] }) => (
    <div className="point-log">
        {log.map((point, i) => (
            <div key={i} className="log-entry">+{point}</div>
        ))}
    </div>
);