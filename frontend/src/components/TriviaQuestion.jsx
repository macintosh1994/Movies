import { useState } from "react";
import { api } from "../api.js";
import { useCountdown, Timer } from "../useCountdown.jsx";

const ANSWER_SECONDS = 15;

export default function TriviaQuestion({ movie, trivia, playerId, onResolved }) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [timedOut, setTimedOut] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const remaining = useCountdown(ANSWER_SECONDS, () => handleChoice(null, true), !submitting && !result);

  async function handleChoice(choice, isTimeout = false) {
    if (submitting || result) return;
    setSelected(choice);
    setTimedOut(isTimeout);
    setSubmitting(true);
    setError("");
    try {
      const res = await api.answerTrivia(movie.id, {
        token: trivia.token,
        answer: choice ?? "",
        playerId,
        movieTitle: movie.title,
      });
      setResult(res);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="card" data-tag="Cross-Examination">
      <h3>{trivia.question}</h3>
      {!result && <Timer label="Answer" remaining={remaining} total={ANSWER_SECONDS} />}
      <div className="choices">
        {trivia.choices.map((choice) => {
          let className = "choice";
          if (result) {
            if (choice === result.correctAnswer) className += " correct";
            else if (choice === selected) className += " incorrect";
          } else if (choice === selected) {
            className += " selected";
          }
          return (
            <button
              key={choice}
              className={className}
              onClick={() => handleChoice(choice)}
              disabled={submitting || Boolean(result)}
            >
              {choice}
            </button>
          );
        })}
      </div>
      {error && <p className="error">{error}</p>}
      {result && (
        <div className="result-panel">
          <div className={"stamp " + (result.correct ? "verified" : "perjury")}>
            {result.correct ? "Verified" : "Perjury Detected"}
          </div>
          <p className={result.correct ? "success" : "error"}>
            {timedOut && !result.correct ? "Time's up — that's as good as a wrong answer. " : ""}
            {result.correct
              ? "Story checks out. No strike."
              : `Correct answer was "${result.correctAnswer}". That's a strike on your record.`}
          </p>
          <button className="btn-primary" onClick={() => onResolved(result)}>
            Get another movie
          </button>
        </div>
      )}
    </div>
  );
}
