import timerReducer, {
  setTime, // Action to set the timer's time
  setRunning, // Action to set the timer's running state
  resetTimerState, // Action to reset the timer's state to initial values
} from "./timerSlice";

// Test suite for the timerSlice reducer and its actions
describe("timerSlice", () => {
  // Define the initial state for the timer slice
  const initialState = {
    time: 0, // Initial time is set to 0
    running: false, // Timer is not running by default
  };

  // Test case: Reducer should return the initial state when no action is provided
  it("should return the initial state", () => {
    // Pass undefined state and an empty action, expecting the initial state
    expect(timerReducer(undefined, {})).toEqual(initialState);
  });

  // Test case: Handle the setTime action to update the timer's time
  it("should handle setTime", () => {
    // Dispatch the setTime action with a value of 10
    const nextState = timerReducer(initialState, setTime(10));

    // Verify that the time state is updated to 10
    expect(nextState.time).toBe(10);
  });

  // Test case: Handle the setRunning action to update the running state
  it("should handle setRunning", () => {
    // Dispatch the setRunning action with a value of true
    const nextState = timerReducer(initialState, setRunning(true));

    // Verify that the running state is updated to true
    expect(nextState.running).toBe(true);
  });

  // Test case: Handle the resetTimerState action to reset the timer's state
  it("should handle resetTimerState", () => {
    // Start with a modified state where the timer is running and has a value
    const modifiedState = {
      time: 100, // Timer is set to 100
      running: true, // Timer is running
    };

    // Dispatch the resetTimerState action
    const nextState = timerReducer(modifiedState, resetTimerState());

    // Verify that the state is reset to the initial state
    expect(nextState).toEqual(initialState);
  });
});
