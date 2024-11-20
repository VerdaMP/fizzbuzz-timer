import appReducer, {
  setPage, // Action to set the current page
  setFizz, // Action to set the Fizz value
  setBuzz, // Action to set the Buzz value
  setFizzBuzzLocked, // Action to toggle the FizzBuzz locked state
  resetAppState, // Action to reset the app state to initial values
} from "./appSlice";

// Test suite for the appSlice reducer and actions
describe("appSlice", () => {
  // Define the initial state for the app
  const initialState = {
    page: "settings", // Default page is "settings"
    fizz: "", // Default Fizz value is an empty string
    buzz: "", // Default Buzz value is an empty string
    fizzBuzzLocked: false, // Inputs are unlocked by default
  };

  // Test case: Reducer should return the initial state when no action is provided
  it("should return the initial state", () => {
    expect(appReducer(undefined, {})).toEqual(initialState);
  });

  // Test case: Handle the setPage action to update the current page
  it("should handle setPage", () => {
    const nextState = appReducer(initialState, setPage("timer")); // Dispatch setPage action
    expect(nextState.page).toBe("timer"); // Verify the page is updated
  });

  // Test case: Handle the setFizz action to update the Fizz value
  it("should handle setFizz", () => {
    const nextState = appReducer(initialState, setFizz("3")); // Dispatch setFizz action
    expect(nextState.fizz).toBe("3"); // Verify the Fizz value is updated
  });

  // Test case: Handle the setBuzz action to update the Buzz value
  it("should handle setBuzz", () => {
    const nextState = appReducer(initialState, setBuzz("5")); // Dispatch setBuzz action
    expect(nextState.buzz).toBe("5"); // Verify the Buzz value is updated
  });

  // Test case: Handle the setFizzBuzzLocked action to toggle the FizzBuzz locked state
  it("should handle setFizzBuzzLocked", () => {
    const nextState = appReducer(initialState, setFizzBuzzLocked(true)); // Dispatch setFizzBuzzLocked action
    expect(nextState.fizzBuzzLocked).toBe(true); // Verify the locked state is updated
  });

  // Test case: Handle the resetAppState action to reset state to initial values
  it("should handle resetAppState", () => {
    // Start with a modified state
    const modifiedState = {
      page: "timer", // Current page is "timer"
      fizz: "3", // Fizz value is 3
      buzz: "5", // Buzz value is 5
      fizzBuzzLocked: true, // Inputs are locked
    };

    // Dispatch resetAppState action
    const nextState = appReducer(modifiedState, resetAppState());

    // Verify the state is reset to initial values
    expect(nextState).toEqual(initialState);
  });
});
