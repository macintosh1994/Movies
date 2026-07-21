import { useMemo } from "react";

const OPENERS = [
  "Let me break this down for you, since you clearly missed it.",
  "It's not that complicated, but I'll go slow.",
  "Okay, so — pay attention this time.",
  "Allow me to explain, since you apparently didn't catch it.",
  "I'll use small words so it's easier to follow.",
  "Wow. Okay. Let me catch you up.",
  "This is genuinely one of the more straightforward plots, but sure, here we go.",
];

const TRANSITIONS = [
  "So basically,",
  "The gist of it is,",
  "In simple terms,",
  "Long story short,",
  "Here's the deal:",
];

const CLOSERS = [
  "Anyway. Now you know. You're welcome.",
  "See? Not so hard. You should actually watch it sometime.",
  "There, now you can pretend you've seen it a little more convincingly.",
  "That's the whole movie, basically. Riveting stuff, right?",
  "I really think you'd have followed most of that on your own, but here we are.",
  "Glad I could clear that up for you.",
];

const MID_ASIDES = [
  "— yes, really —",
  "(stay with me)",
  "— I know, riveting —",
  "(try to keep up)",
  "— shocking, right? —",
];

function pick(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function splitSentences(text) {
  return text.split(/(?<=[.!?])\s+/).filter(Boolean);
}

export default function MansplainReveal({ movie, onNext, loading, variant = "confessed" }) {
  const opener = useMemo(() => pick(OPENERS), [movie.id]);
  const transition = useMemo(() => pick(TRANSITIONS), [movie.id]);
  const closer = useMemo(() => pick(CLOSERS), [movie.id]);
  const aside = useMemo(() => pick(MID_ASIDES), [movie.id]);

  const overview = movie.overview || "there's a plot. Movies tend to have those.";
  const sentences = splitSentences(overview);
  const busted = variant === "busted";

  return (
    <div className="card mansplain" data-tag={busted ? "Perjury" : "Confession"}>
      <div className={"stamp " + (busted ? "perjury" : "logged")}>
        {busted ? "Perjury Confirmed" : "Confession Logged"}
      </div>
      <h3>
        {busted ? (
          <>Caught you — you haven't seen {movie.title}.</>
        ) : (
          <>You haven't seen {movie.title}??</>
        )}
      </h3>
      <p className="mansplain-opener">{opener}</p>
      <p>
        <span className="mansplain-transition">{transition}</span> {sentences[0] || overview}
        {sentences.length > 2 && (
          <>
            {" "}
            <em>{aside}</em> {sentences.slice(1).join(" ")}
          </>
        )}
        {sentences.length === 2 && <> {sentences[1]}</>}
      </p>
      <p className="mansplain-closer">{closer}</p>
      <button className="btn-primary" onClick={onNext} disabled={loading}>
        {loading ? "Finding a movie..." : "Get another movie"}
      </button>
    </div>
  );
}
