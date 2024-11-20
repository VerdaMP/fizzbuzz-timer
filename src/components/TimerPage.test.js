import React from "react";
import { render, fireEvent, screen, act } from "@testing-library/react";
import TimerPage from "./TimerPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

// Use fake timers to control and test timer-based functionality
jest.useFakeTimers();

// Test suite for the TimerPage component
describe("TimerPage", () => {
  // Initial Redux store state for tests
  const initialState = {
    app: {
      fizz: "3", // Value of "Fizz" input
      buzz: "5", // Value of "Buzz" input
      fizzBuzzLocked: true, // Inputs are locked when timer is running
    },
    timer: {
      time: 0, // Initial timer value
      running: false, // Timer is not running initially
    },
  };

  // Create a mock Redux store
  const mockStore = configureStore();
  let store;

  // Reinitialize the mock store before each test
  beforeEach(() => {
    store = mockStore(initialState);
  });

  // Clear timers after each test
  afterEach(() => {
    jest.clearAllTimers();
  });

  // Test case: Verify the TimerPage renders correctly
  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <TimerPage />
      </Provider>,
    );

    // Check for key elements in the rendered output
    expect(screen.getByText(/Time Elapsed/i)).toBeInTheDocument(); // Header text
    expect(screen.getByText(/Start/i)).toBeInTheDocument(); // Start button
    expect(screen.getByText(/Reset/i)).toBeInTheDocument(); // Reset button
    expect(screen.getByText(/0:00:00/i)).toBeInTheDocument(); // Initial timer display
  });

  // Test case: Start the timer when "Start" button is clicked
  it("starts the timer when Start button is clicked", () => {
    render(
      <Provider store={store}>
        <TimerPage />
      </Provider>,
    );

    // Simulate clicking the Start button
    fireEvent.click(screen.getByText(/Start/i));

    // Fast-forward the timer by 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Verify that appropriate actions were dispatched to the Redux store
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "timer/setRunning", payload: true }); // Timer started
    expect(actions).toContainEqual({
      type: "app/setFizzBuzzLocked",
      payload: true,
    }); // Inputs locked
  });

  // Test case: Stop the timer when "Stop" button is clicked
  it("stops the timer when Stop button is clicked", () => {
    // Initialize store with timer running
    store = mockStore({
      app: {
        fizz: "3",
        buzz: "5",
        fizzBuzzLocked: true,
      },
      timer: {
        time: 10, // Timer at 10 seconds
        running: true, // Timer is running
      },
    });

    render(
      <Provider store={store}>
        <TimerPage />
      </Provider>,
    );

    // Simulate clicking the Stop button
    fireEvent.click(screen.getByText(/Stop/i));

    // Verify that appropriate actions were dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: "timer/setRunning",
      payload: false,
    }); // Timer stopped
  });

  // Test case: Reset the timer when "Reset" button is clicked
  it("resets the timer when Reset button is clicked", () => {
    // Initialize store with non-zero timer value
    store = mockStore({
      app: {
        fizz: "3",
        buzz: "5",
        fizzBuzzLocked: true,
      },
      timer: {
        time: 10, // Timer at 10 seconds
        running: false, // Timer is not running
      },
    });

    render(
      <Provider store={store}>
        <TimerPage />
      </Provider>,
    );

    // Simulate clicking the Reset button
    fireEvent.click(screen.getByText(/Reset/i));

    // Verify that the reset action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "timer/resetTimerState" }); // Timer reset
    expect(actions).toContainEqual({
      type: "app/setFizzBuzzLocked",
      payload: false,
    }); // Inputs unlocked
  });

  // Test case: Display "Fizz" when time is a multiple of the Fizz value
  it("displays Fizz when time is a multiple of Fizz", () => {
    store = mockStore({
      app: {
        fizz: "3",
        buzz: "5",
        fizzBuzzLocked: true,
      },
      timer: {
        time: 3, // Timer at 3 seconds
        running: false,
      },
    });

    render(
      <Provider store={store}>
        <TimerPage />
      </Provider>,
    );

    // Verify that "Fizz" is displayed
    expect(screen.getByText(/Fizz/i)).toBeInTheDocument();
  });

  // Test case: Display "Buzz" when time is a multiple of the Buzz value
  it("displays Buzz when time is a multiple of Buzz", () => {
    store = mockStore({
      app: {
        fizz: "3",
        buzz: "5",
        fizzBuzzLocked: true,
      },
      timer: {
        time: 5, // Timer at 5 seconds
        running: false,
      },
    });

    render(
      <Provider store={store}>
        <TimerPage />
      </Provider>,
    );

    // Verify that "Buzz" is displayed
    expect(screen.getByText(/Buzz/i)).toBeInTheDocument();
  });

  // Test case: Display "FizzBuzz" when time is a multiple of both Fizz and Buzz
  it("displays FizzBuzz when time is a multiple of both Fizz and Buzz", () => {
    store = mockStore({
      app: {
        fizz: "3",
        buzz: "5",
        fizzBuzzLocked: true,
      },
      timer: {
        time: 15, // Timer at 15 seconds
        running: false,
      },
    });

    render(
      <Provider store={store}>
        <TimerPage />
      </Provider>,
    );

    // Verify that "FizzBuzz" is displayed
    expect(screen.getByText(/FizzBuzz/i)).toBeInTheDocument();
  });

  // Test case: Navigate back to SettingsPage when "< Set Times" is clicked
  it('navigates back to SettingsPage when "< Set Times" is clicked and timer is not running', () => {
    render(
      <Provider store={store}>
        <TimerPage />
      </Provider>,
    );

    // Simulate clicking the "< Set Times" button
    fireEvent.click(screen.getByText(/< Set Times/i));

    // Verify that the page navigation action was dispatched
    const actions = store.getActions();
    expect(actions).toContainEqual({
      type: "app/setPage",
      payload: "settings",
    });
  });

  // Test case: Alert the user if trying to navigate back while timer is running
  it("alerts user if trying to navigate back while timer is running", () => {
    // Mock the global alert function
    global.alert = jest.fn();

    // Initialize store with the timer running
    store = mockStore({
      app: {
        fizz: "3",
        buzz: "5",
        fizzBuzzLocked: true,
      },
      timer: {
        time: 5, // Timer at 5 seconds
        running: true, // Timer is running
      },
    });

    render(
      <Provider store={store}>
        <TimerPage />
      </Provider>,
    );

    // Simulate clicking the "< Set Times" button
    fireEvent.click(screen.getByText(/< Set Times/i));

    // Verify that an alert was displayed
    expect(global.alert).toHaveBeenCalledWith(
      "Please stop the timer before going back to set times.",
    );
  });
});
