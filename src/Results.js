import React from "react";

const Results = ({ score, reset, wpm }) => {
  return (
    <div className="container-score">
      <h3>Results</h3>
      <div style={{ fontWeight: "bold" }}>Speed:</div>
      <div> {score} char/sec</div>
      <div> {wpm} words/minute</div>
      <button className="reset-button" onClick={reset}>
        Reset Game
      </button>
    </div>
  );
};

export default Results;
