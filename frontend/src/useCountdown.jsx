import { useEffect, useRef, useState } from "react";

// Counts down from `seconds` and calls onExpire once. Pass `active: false`
// to skip starting the timer (e.g. once the round is already resolved).
export function useCountdown(seconds, onExpire, active = true) {
  const [remaining, setRemaining] = useState(seconds);
  const onExpireRef = useRef(onExpire);
  onExpireRef.current = onExpire;

  useEffect(() => {
    if (!active) return;
    setRemaining(seconds);
    const start = Date.now();
    const id = setInterval(() => {
      const left = Math.max(0, seconds - Math.floor((Date.now() - start) / 1000));
      setRemaining(left);
      if (left <= 0) {
        clearInterval(id);
        onExpireRef.current();
      }
    }, 1000);
    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seconds, active]);

  return remaining;
}

export function Timer({ label, remaining, total }) {
  const pct = Math.max(0, Math.min(100, (remaining / total) * 100));
  return (
    <div className="timer-wrap">
      <div className="timer-row">
        <span>{label}</span>
        <span className="timer-num">{remaining}</span>
      </div>
      <div className="timer-track">
        <div
          className={"timer-fill" + (remaining <= 5 ? " urgent" : "")}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
