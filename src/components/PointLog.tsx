import { useEffect, useRef } from "react";
import '../App.css';

interface PointLogProps {
    log: number[];
}

export const PointLog = ({ log }: PointLogProps) => {
    const logRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (logRef.current) {
            logRef.current.scrollTop = logRef.current.scrollHeight;
        }
    }, [log]);

    return (
        <div className="point-log" ref={logRef}>
            {log.map((entry, i) => (
                <div key={i} className="point-log-entry">+{entry}</div>
            ))}
        </div>
    );
};