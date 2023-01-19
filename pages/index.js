import { useEffect, useState } from "react";
import styles from "../styles/Home.module.css";

export default function Home({ props }) {

  console.log(props)
  const [isActive, setIsActive] = useState(false);
  const [time, setTime] = useState(0);
  const [interval, setIsInterval] = useState();
  const [ispaused, setIsPaused] = useState(false);
  const [islap, setlap] = useState([]);
  const [totalTime, setTotalTime] = useState([]);
  const [sum, setSum] = useState([0]);

  const lap = () => {
    const getTime = JSON.parse(localStorage.getItem("time")) || [];
    setTime((time) => time + 10);
    getTime.push(time);
    // getTime.reverse();
    localStorage.setItem("time", JSON.stringify(getTime));
    setlap(getTime);
  };
  useEffect(() => {
    setlap(JSON.parse(localStorage.getItem("time")) || []);
    if (isActive && ispaused === false) {
      setIsInterval(
        setInterval(() => {
          setTime((time) => time + 10);
        }, 10)
      );
    }
    return clearInterval(interval);
  }, [isActive, ispaused]);

  const handleStart = () => {
    setIsActive(true);
  };

  const handleReset = () => {
    setIsActive(false);
    setTime(0);
  };

  const stop = () => {
    setIsPaused(!ispaused);
    handleStart();
  };

  const totalSum = (item) => {
    debugger
    let total = 0;
    debugger
    totalTime.forEach((time) => {
      total = total + time;
    });
    debugger
    let sum = 0;
    debugger
    sum = total + item;
    debugger
    totalTime.push(sum);
    debugger
    return sum;
  };

  const convertTime = (time) => {
    const sum = `${("0" + (Math.floor(time / 60000) % 60)).slice(-2)}:${(
      "0" +
      (Math.floor(time / 1000) % 60)
    ).slice(-2)}:${("0" + (Math.floor(time / 10) % 100)).slice(-2)}`;
    return sum;
  };

  function msToTime(time) {
    var milliseconds = parseInt((time % 1000) / 100)
        , seconds = parseInt((time / 1000) % 60)
        , minutes = parseInt((time / (1000 * 60)) % 60)
        , hours = parseInt((time / (1000* 60 *60)) % 24);

    hours = (hours < 10) ? "0" + hours : hours;
    minutes = (minutes < 10) ? "0" + minutes : minutes;
    seconds = (seconds < 10) ? "0" + seconds : seconds;

    return  minutes + ":" + seconds + "." + milliseconds;
};

  return (
    <div className={styles.container}>
      stopwatch
      <p>{msToTime(time)}</p>
      <div>
        {isActive ? (
          <>
            {ispaused ? (
              <button onClick={handleStart}>Start</button>
            ) : (
              <button onClick={stop}>stop</button>
            )}
            <button onClick={handleReset}>Reset</button>
            <button onClick={lap}>lap</button>
          </>
        ) : (
          <button onClick={handleStart}>Start</button>
        )}
      </div>
      <table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>Time</th>
            <th>Total Time</th>
          </tr>
        </thead>
        <tbody>
          {islap?.map((item, index) => (
            <tr key={index}>
              <td>
                {("0" + (Math.floor(item / 60000) % 60)).slice(-2)}:
                {("0" + (Math.floor(item / 1000) % 60)).slice(-2)}:
                {("0" + (Math.floor(item / 10) % 100)).slice(-2)}
              </td>
              <td>{convertTime(totalSum(item))}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

 
export async function getStaticProps() {
  return {
    props: {
      hetal:"hi",
    },
  }
}
