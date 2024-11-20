import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import SettingsPage from "./SettingsPage";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";

// Test suite for the SettingsPage component
describe("SettingsPage", () => {
  // Initial state for the Redux store
  const initialState = {
    app: {
      page: "settings", // Current page
      fizz: "", // Fizz input value
      buzz: "", // Buzz input value
      fizzBuzzLocked: false, // Whether inputs are locked
    },
    settings: {
      error: "", // Error message
    },
  };

  // Create a mock store for testing
  const mockStore = configureStore();
  let store;

  // Reset the mock store before each test
  beforeEach(() => {
    store = mockStore(initialState);
  });

  // Test case: Verify the component renders correctly
  it("renders correctly", () => {
    render(
      <Provider store={store}>
        <SettingsPage />
      </Provider>,
    );

    // Check for key elements in the rendered output
    expect(
      screen.getByText(/Please enter a fizz and buzz time in seconds/i),
    ).toBeInTheDocument(); // Instructional text
    expect(screen.getByLabelText(/Fizz:/i)).toBeInTheDocument(); // Fizz input label
    expect(screen.getByLabelText(/Buzz:/i)).toBeInTheDocument(); // Buzz input label
    expect(screen.getByText(/Go to Timer >/i)).toBeInTheDocument(); // Navigation button
  });

  // Test case: Display error when an invalid Fizz value is entered
  it("displays error when invalid fizz value is entered", () => {
    // Update store state with an error message
    store = mockStore({
      app: {
        page: "settings",
        fizz: "1", // Invalid fizz value
        buzz: "4", // Buzz value
        fizzBuzzLocked: false,
      },
      settings: {
        error: "test error", // Error message
      },
    });

    render(
      <Provider store={store}>
        <SettingsPage />
      </Provider>,
    );

    // Verify that the error message is displayed
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  // Test case: Display error when an invalid Buzz value is entered
  it("displays error when invalid buzz value is entered", () => {
    // Update store state with an error message
    store = mockStore({
      app: {
        page: "settings",
        fizz: "2", // Fizz value
        buzz: "11", // Invalid buzz value
        fizzBuzzLocked: false,
      },
      settings: {
        error: "test error", // Error message
      },
    });

    render(
      <Provider store={store}>
        <SettingsPage />
      </Provider>,
    );

    // Verify that the error message is displayed
    expect(screen.getByTestId("error-message")).toBeInTheDocument();
  });

  // Test case: Navigate to the TimerPage when valid inputs are provided
  it("navigates to TimerPage when valid inputs are provided", () => {
    // Update store state with valid inputs
    store = mockStore({
      app: {
        page: "settings",
        fizz: "3", // Valid fizz value
        buzz: "5", // Valid buzz value
        fizzBuzzLocked: false,
      },
      settings: {
        error: "", // No error
      },
    });

    render(
      <Provider store={store}>
        <SettingsPage />
      </Provider>,
    );

    // Simulate clicking the navigation button
    fireEvent.click(screen.getByText(/Go to Timer >/i));

    // Verify that the appropriate action was dispatched to the store
    const actions = store.getActions();
    expect(actions).toContainEqual({ type: "app/setPage", payload: "timer" });
  });

  // Test case: Disable inputs when fizzBuzzLocked is true
  it("disables inputs when fizzBuzzLocked is true", () => {
    // Update store state to lock inputs
    store = mockStore({
      app: {
        page: "settings",
        fizz: "3", // Fizz value
        buzz: "5", // Buzz value
        fizzBuzzLocked: true, // Inputs are locked
      },
      settings: {
        error: "", // No error
      },
    });

    render(
      <Provider store={store}>
        <SettingsPage />
      </Provider>,
    );

    // Verify that inputs are disabled
    expect(screen.getByLabelText(/Fizz:/i)).toBeDisabled();
    expect(screen.getByLabelText(/Buzz:/i)).toBeDisabled();
  });
});
