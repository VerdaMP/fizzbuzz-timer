import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setFizz, setBuzz, setPage } from "../redux/slices/appSlice";
import { setError } from "../redux/slices/settingSlice";
import "./SettingsPage.css";

function SettingsPage() {
  const dispatch = useDispatch(); // Allows dispatching actions to the Redux store

  // Access state values from Redux store
  const fizz = useSelector((state) => state.app.fizz);
  const buzz = useSelector((state) => state.app.buzz);
  const fizzBuzzLocked = useSelector((state) => state.app.fizzBuzzLocked);
  const error = useSelector((state) => state.settings.error);

  // Handler for Fizz input changes
  const handleFizzChange = (e) => {
    const value = e.target.value;
    dispatch(setFizz(value)); // Update the Redux state
  };

  // Handler for Buzz input changes
  const handleBuzzChange = (e) => {
    const value = e.target.value;
    dispatch(setBuzz(value)); // Update the Redux state
  };

  const validateInput = (e) => {
    const value = e.target.value;
    // Validate the input value
    if (value >= 2 && value <= 10) {
      dispatch(setError("")); // Clear any existing error
    } else {
      dispatch(setError("Fizz and Buzz values must be between 2 and 10."));
    }
  };

  // Handler for the "Go to Timer >" button click
  const handleGoToTimerClick = () => {
    if (fizz && buzz && !error) {
      dispatch(setPage("timer")); // Navigate to the TimerPage
    } else {
      dispatch(setError("Please enter valid Fizz and Buzz values."));
    }
  };

  return (
    <div className="settings-container">
      <span>Please enter a fizz and buzz time in seconds. </span>
      <strong>Values should be 2 to 10, inclusive</strong>

      <div className="input-group">
        {/* Fizz Input */}
        <label>
          Fizz:
          <input
            type="number"
            value={fizz}
            onChange={handleFizzChange}
            onBlur={validateInput}
            min="2"
            max="10"
            disabled={fizzBuzzLocked} // Disable input if locked
          />
        </label>

        {/* Buzz Input */}
        <label>
          Buzz:
          <input
            type="number"
            value={buzz}
            onChange={handleBuzzChange}
            onBlur={validateInput}
            min="2"
            max="10"
            disabled={fizzBuzzLocked} // Disable input if locked
          />
        </label>
      </div>

      {/* "Go to Timer >" Button */}
      <button className="go-button" onClick={handleGoToTimerClick}>
        Go to Timer &gt;
      </button>

      {/* Display error message if any */}
      {error && (
        <div className="error-message" data-testid="error-message">
          {error}
        </div>
      )}
    </div>
  );
}

export default SettingsPage;
