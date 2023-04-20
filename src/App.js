import React, { useState, useEffect } from "react";
import Results from "./Results";
import Data from "./data";
import "./styles.css";

const generateRandomSentence = () => {
  const filteredData = Data.filter((item) => item.length <= 75);
  const randomIndex = Math.floor(filteredData.length * Math.random());
  return filteredData[randomIndex];
};

export default function App() {
  const [input, setInput] = useState("");
  const [index, setIndex] = useState(0);
  const [sentence, setSentence] = useState(generateRandomSentence);
  const [start, setStart] = useState(null);
  const [isFinished, setIsFinished] = useState(false);
  const [score, setScore] = useState(0);
  const [wpm, setWpm] = useState(0);

  // check for when user has finished sentence
  useEffect(() => {
    if (index === sentence.length) {
      const end = Date.now();
      const seconds = (end - start) / 1000;
      const newScore = sentence.length / seconds;
      // need to strip the punctuations
      const newWpm = sentence.split(" ").length / (seconds / 60);

      setScore(newScore.toFixed(2));
      setWpm(newWpm.toFixed(2));
      setIsFinished(true);
    }
  }, [index, sentence, start]);

  const handleInput = (e) => {
    if (isFinished) return;

    // if just started add start timestamp
    if (!start) {
      setStart(Date.now());
    }

    let { value } = e.target;

    // couldn't type this my keyboard, will replace character if typed
    if (value[value.length - 1] === "'" && sentence[index] === "’") {
      const arr = value.split("");
      arr[arr.length - 1] = "’";
      value = arr.join("");
    }

    if (sentence[index] === value[value.length - 1]) {
      setIndex(index + 1);
      setInput(value);
    }
  };

  const reset = () => {
    setSentence(generateRandomSentence);
    setInput();
    setInput("");
    setIndex(0);
    setStart(null);
    setIsFinished(false);
    setScore(0);
    setWpm(0);
  };

  return (
    <React.Fragment>
      <div className="App">
        <div className="sentence-container">
          <h2>
            {sentence.split("").map((item, i) => (
              <span key={i} className={i === index ? "green" : undefined}>
                {item}
              </span>
            ))}
          </h2>
        </div>
        <textarea
          onChange={(e) => handleInput(e)}
          value={input}
          className="textarea"
          placeholder="start typing.."
          rows="6"
          cols="70"
        ></textarea>
      </div>
      {isFinished && <Results score={score} reset={reset} wpm={wpm} />}
    </React.Fragment>
  );
}
