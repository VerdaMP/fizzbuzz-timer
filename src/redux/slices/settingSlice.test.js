import settingsReducer, { setError } from "./settingSlice";

// Test suite for the settingsSlice reducer and actions
describe("settingSlice", () => {
  // Define the initial state for the settings slice
  const initialState = {
    error: "", // Default error state is an empty string
  };

  // Test case: Reducer should return the initial state when no action is provided
  it("should return the initial state", () => {
    // Pass undefined state and an empty action, expecting the initial state
    expect(settingsReducer(undefined, {})).toEqual(initialState);
  });

  // Test case: Handle the setError action to update the error message
  it("should handle setError", () => {
    // Dispatch the setError action with a test error message
    const nextState = settingsReducer(initialState, setError("test error"));

    // Verify that the error state is updated with the provided error message
    expect(nextState.error).toBe("test error");
  });
});
