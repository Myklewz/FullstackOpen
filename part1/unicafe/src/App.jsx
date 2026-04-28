import { useState } from "react";

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [all, setAll] = useState(0);
  const [avg, setAvg] = useState(0);
  const [score, setScore] = useState(0);

  const handleGood = () => {
    setAvg((score + 1) / (all + 1));
    setGood(good + 1);
    setAll(all + 1);
    setScore(score + 1);
  };
  const handleNeutral = () => {
    setAvg(score / (all + 1));
    setNeutral(neutral + 1);
    setAll(all + 1);
  };
  const handleBad = () => {
    setAvg((score - 1) / (all + 1));
    setBad(bad + 1);
    setAll(all + 1);
    setScore(score - 1);
  };

  if (all == 0) {
    return (
      <div>
        <h1>give feedback</h1>
        <Button onClick={handleGood} text={"good"} />
        <Button onClick={handleNeutral} text={"neutral"} />
        <Button onClick={handleBad} text={"bad"} />
        <h1>statistics</h1>
        No feedback given
      </div>
    );
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={handleGood} text={"good"} />
      <Button onClick={handleNeutral} text={"neutral"} />
      <Button onClick={handleBad} text={"bad"} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} all={all} avg={avg} />
    </div>
  );
};

const Button = ({ onClick, text }) => <button onClick={onClick}>{text}</button>;

const Statistics = ({ good, neutral, bad, all, avg }) => {
  return (
    <table>
      <tbody>
        <StatisticsLine type={"good"} count={good} />
        <StatisticsLine type={"neutral"} count={neutral} />
        <StatisticsLine type={"bad"} count={bad} />
        <StatisticsLine type={"all"} count={all} />
        <StatisticsLine type={"average"} count={avg} />
        <StatisticsLine
          type={"positive"}
          count={(good / all) * 100}
          unit={"%"}
        />
      </tbody>
    </table>
  );
};

const StatisticsLine = ({ type, count, unit }) => {
  return (
    <tr>
      <td>{type}</td>
      <td>
        {count} {unit}
      </td>
    </tr>
  );
};

export default App;
