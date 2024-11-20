import React from "react";
import { useSelector } from "react-redux";
import SettingsPage from "./components/SettingsPage";
import TimerPage from "./components/TimerPage";

function App() {
  // Access the current page from the Redux store
  const page = useSelector((state) => state.app.page);

  return (
    <div className="App">
      {/* Conditionally render the SettingsPage or TimerPage based on the current page */}
      {page === "settings" && <SettingsPage />}
      {page === "timer" && <TimerPage />}
    </div>
  );
}

export default App;
