import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setTime,
  setRunning,
  resetTimerState,
} from "../redux/slices/timerSlice";
import { setPage, setFizzBuzzLocked } from "../redux/slices/appSlice";
import "./TimerPage.css";

function TimerPage() {
  const dispatch = useDispatch(); // Allows dispatching actions to the Redux store

  // Access state values from Redux store
  const fizz = parseInt(useSelector((state) => state.app.fizz));
  const buzz = parseInt(useSelector((state) => state.app.buzz));
  const time = useSelector((state) => state.timer.time);
  const running = useSelector((state) => state.timer.running);

  const maxTime = 35999; // Maximum time limit (9:59:59 in seconds)

  // Effect hook to handle the timer logic
  useEffect(() => {
    let timer;
    // If the timer is running and hasn't reached the max time
    if (running && time < maxTime) {
      // Increment time every second
      timer = setInterval(() => {
        dispatch(setTime(time + 1)); // Update time in Redux state
      }, 1000);
    } else if (time >= maxTime) {
      // Stop the timer if max time is reached
      dispatch(setRunning(false));
    }
    // Cleanup the interval on component unmount or when dependencies change
    return () => clearInterval(timer);
  }, [running, time, dispatch]);

  // Function to format the elapsed time as h:MM:SS
  const formatTime = () => {
    const hours = Math.floor(time / 3600); // Calculate hours
    const minutes = Math.floor((time % 3600) / 60); // Calculate minutes
    const seconds = time % 60; // Calculate seconds

    // Format time with zero-padded minutes and seconds
    return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  // Function to determine what FizzBuzz text to display
  const getFizzBuzzText = () => {
    if (time === 0) return ""; // No text if time is zero
    const isFizz = fizz && time % fizz === 0; // Check if time is multiple of fizz
    const isBuzz = buzz && time % buzz === 0; // Check if time is multiple of buzz

    // Return appropriate text based on FizzBuzz logic
    if (isFizz && isBuzz) return "FizzBuzz";
    if (isFizz) return "Fizz";
    if (isBuzz) return "Buzz";
    return "";
  };

  // Handler for the Start button
  const handleStart = () => {
    if (!running) {
      dispatch(setFizzBuzzLocked(true)); // Disable the fizz buzz inputs
      dispatch(setRunning(true)); // Start the timer
    }
  };

  // Handler for the Stop/Reset button
  const handleStopReset = () => {
    if (running) {
      dispatch(setRunning(false)); // Stop the timer
    } else {
      dispatch(setFizzBuzzLocked(false)); // Unlock Fizz and Buzz inputs
      dispatch(resetTimerState()); // Reset the timer state
    }
  };

  // Handler for the "< Set Times" button
  const handleBackToSettings = () => {
    if (!running) {
      dispatch(setPage("settings")); // Navigate back to the Settings page
    } else {
      alert("Please stop the timer before going back to set times.");
    }
  };

  return (
    <>
      {/* "< Set Times" Button */}
      <button className="back-button" onClick={handleBackToSettings}>
        &lt; Set Times
      </button>

      <div className="timer-label">Time Elapsed</div>

      {/* Display the formatted time */}
      <div className="counter-container">{formatTime()}</div>

      {/* Start and Stop/Reset Buttons */}
      <div className="button-group">
        <button
          className="timer-button start-button"
          onClick={handleStart}
          disabled={running} // Disable Start button if timer is running
        >
          Start
        </button>
        <button className="timer-button stop-button" onClick={handleStopReset}>
          {running ? "Stop" : "Reset"} {/* Change text based on timer state */}
        </button>
      </div>

      {/* Display FizzBuzz text */}
      <div className="fizzbuzz-text">{getFizzBuzzText()}</div>
    </>
  );
}

export default TimerPage;
