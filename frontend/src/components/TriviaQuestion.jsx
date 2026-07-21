import { useState } from "react";
import { api } from "../api.js";

export default function TriviaQuestion({ movie, trivia, playerId, onResolved }) {
  const [selected, setSelected] = useState(null);
  const [result, setResult] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleChoice(choice) {
    if (submitting || result) return;
    setSelected(choice);
    setSubmitting(true);
    setError("");
    try {
      const res = await api.answerTrivia(movie.id, {
        token: trivia.token,
        answer: choice,
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
    <div className="card">
      <h3>{trivia.question}</h3>
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
          <p className={result.correct ? "success" : "error"}>
            {result.correct
              ? "Correct! No strike for you."
              : `Nope. The correct answer was "${result.correctAnswer}". That's a strike.`}
          </p>
          <button className="btn-primary" onClick={() => onResolved(result)}>
            Get another movie
          </button>
        </div>
      )}
    </div>
  );
}
