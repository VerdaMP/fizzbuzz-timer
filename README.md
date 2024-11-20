# **Fizz Buzz Timer Application**

Welcome to the **Fizz Buzz Timer Application**! This React-based app allows users to set custom **Fizz** and **Buzz** values, start a timer, and observe real-time **Fizz Buzz** calculations based on the elapsed time. This README provides a comprehensive guide to understanding, setting up, and using the application.

---

## **Table of Contents**

1. [Overview](#overview)
2. [Features](#features)
3. [Technologies Used](#technologies-used)
4. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
5. [Usage](#usage)
   - [Setting Fizz and Buzz Values](#setting-fizz-and-buzz-values)
   - [Using the Timer](#using-the-timer)
6. [Application Structure](#application-structure)
7. [Styles and Design Guidelines](#styles-and-design-guidelines)
8. [Acknowledgments](#acknowledgments)

---

## **Overview**

The **Fizz Buzz Timer Application** is an interactive web app that combines the classic Fizz Buzz problem with a timer functionality. Users can:

- Input custom **Fizz** and **Buzz** values ranging from **2 to 10 seconds**.
- Start, stop, and reset a timer that displays the **elapsed time** in **h:MM:SS** format.
- Observe the display of "Fizz", "Buzz", or "FizzBuzz" when the elapsed time meets specific conditions based on their inputs.

---

## **Features**

- **Customizable Fizz and Buzz Values**: Users can set their own values for Fizz and Buzz within the specified range.
- **Responsive Timer**: Start, stop, and reset the timer with intuitive controls.
- **Real-Time Fizz Buzz Calculations**: The app dynamically displays "Fizz", "Buzz", or "FizzBuzz" based on the elapsed time.
- **User-Friendly Interface**: Clean design with clear instructions and easy navigation.
- **Input Validation**: Ensures users input valid values and provides error messages when necessary.

---

## **Technologies Used**

- **React**: JavaScript library for building user interfaces.
- **JavaScript (ES6+)**: Core language for app functionality.
- **HTML5**: Markup language for structuring the app.
- **CSS3**: Styling and layout of the application.
- **Node.js & npm**: Runtime and package manager for managing dependencies.

---

## **Getting Started**

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### **Prerequisites**

- **Node.js** (v12 or higher)
- **npm** (v6 or higher)

Check if you have them installed:

```bash
node -v
npm -v
```

### **Installation**

1.  **Clone the Repository**

    ```bash
    git clone https://github.com/VerdaMP/fizzbuzz-timer.git
    ```

2.  **Navigate to the Project Directory**

    ```bash
    cd fizzbuzz-timer
    ```

3.  **Install Dependencies**

    ```bash
    npm install
    ```

4.  **Start the Application**

    ```bash
    npm start
    ```

    The app should now be running on http://localhost:3000.

## **Usage**

**Setting Fizz and Buzz Values**

1. **Landing on the Settings Page**

   When you first open the app, you'll be presented with the **Settings** page.

2. **Input Fizz and Buzz Values**

   - Enter integer values for **Fizz** and **Buzz** in the input fields.

   - **Constraints:**
     - Values must be integers between **2 and 10** (inclusive).
     - **Fizz** and **Buzz** values cannot be changed once the timer has started.

3. **Navigate to Timer**

   - Click the **"Go to Timer >"** button to proceed.
   - If inputs are invalid or missing, an error message will be displayed.

**Using the Timer**

1. **Timer Page Overview**

   - **Time Elapsed:** Displays the total elapsed time in **h:MM:SS** format.

   - **Control Buttons:**
     - **Start:** Begins the timer.
     - **Stop / Reset:** Stops the timer if it's running or resets it if it's stopped.
     - **\< Set Times:** Returns to the Settings page (only when the timer is stopped).

2. **Starting the Timer**

   - Click the **"Start"** button to begin timing.
   - The **"Start"** button will be disabled while the timer is running.

3. **Understanding Fizz Buzz Display**

   - The app will display:
     - **"Fizz"** if the elapsed time (in seconds) is a multiple of **Fizz**.
     - **"Buzz"** if it's a multiple of **Buzz**.
     - **"FizzBuzz"** if it's a multiple of both.

4. **Stopping and Resetting the Timer**

   - Click **"Stop"**" to halt the timer.
   - While stopped, you can:
     - Click **"Reset"** to reset the elapsed time to **0:00:00**.
     - Click **"\< Set Times"** to return to the Settings page and adjust values.

5. **Returning to Settings**
   - Ensure the timer is stopped.
   - Click **"\< Set Times"** to go back and modify Fizz and Buzz.

## **Application Structure**

Here's an overview of the application's file structure:

    fizzbuzz-timer/
    │
    ├── public/
    │ ├── index.html
    │ └── favicon.ico
    │
    ├── src/
    │ ├── components/
    │ │ ├── App.js
    │ │ ├── SettingsPage.js
    │ │ └── TimerPage.js
    │ │
    │ ├── styles/
    │ │ └── index.css
    │ │
    │ ├── index.js
    │ └── serviceWorker.js
    │
    ├── package.json
    ├── package-lock.json
    └── README.md

- Key Components
  - **App.js:** The root component managing navigation between pages.
  - **SettingsPage.js:** Handles user input for Fizz and Buzz values.
  - **SettingsPage.css:** Contains SettingsPage component specific styles.
  - **TimerPage.js:** Manages the timer functionality and Fizz Buzz display.
  - **TimerPage.css:** Contains TimerPage component specific styles.
  - **index.css:** Contains global styles.

## **State Management**

    The Fizz Buzz Application utilizes Redux with Redux Toolkit for state management. This approach centralizes the application's state, making it predictable and easier to maintain, especially as the application scales.

### **Redux Store Setup**

    The Redux store is configured using the ```configurestore``` function from Redux Toolkit, which sets up the store with good defaults, including Redux DevTools support and middleware integration.

## **State Slices**

    The application's state is divided into slices, each responsible for managing a specific part of the state. This modular approach enhances maintainability and scalability.

1. `appSlice`

   **Purpose:** Manages the state related to the application flow and user inputs.

   - **State Variables:**

     - `page` (string): Determines which page to display (`'settings'` or `'timer'`).
     - `fizz` (string): Stores the user-input value for **Fizz.**
     - `buzz` (string): Stores the user-input value for **Buzz.**
     - `fizzBuzzLocked` (boolean): Controls whether the **Fizz** and **Buzz** inputs are editable.

   - **Actions and Reducers:**
     - `setPage(page)`: Updates the `page` state.
     - `setFizz(value)`: Updates the `fizz` state.
     - `setBuzz(value)`: Updates the `buzz` state.
     - `setFizzBuzzLocked(boolean)`: Locks or unlocks the **Fizz** and **Buzz** inputs.
     - `resetAppState()`: Resets the `app` state to initial values.

2. `timerSlice`

   **Purpose:** Manages the state related to the timer functionality.

   - **State Variables:**

     - `time` (number): Tracks the total elapsed time in seconds.
     - `running` (boolean): Indicates whether the timer is currently running.

   - **Actions and Reducers:**
     - `setTime(value)`: Updates the `time` state.
     - `setRunning(boolean)`: Starts or stops the timer
     - `resetTimerState()`: Resets the `timer` state to initial values.

3. `settingSlice`

   **Purpose:** Manages the state related to the settings page functionality.

   - **State Variables:**

     - `error` (string): The error message to be displayed if the inputs for fizz or buzz are invalid.

   - **Actions and Reducers:**
     - `setError(value)`: Updates the `error` state.

- **Connecting Components to Redux**

  Components interact with the Redux store using React Redux hooks:

  - `useSelector`: Accesses state variables from the Redux store.

  - `useDispatch`: Dispatches actions to update the state.

- **SettingsPage Component**

  Handles user inputs for **Fizz** and **Buzz** values and interacts with the `app` slice.

  - **Accesses:**

    - `fizz`, `buzz`, `fizzBuzzLocked` from the `app` slice via `useSelector`.
    - `error` from the `setting` slice via `useSelector`

  - **Dispatches:**
    - `setFizz(value)`
    - `setBuzz(value)`
    - `setPage('timer')`
    - `setError(string)`

- **SettingsPage Component**

  Handles the timer functionality and Fizz Buzz logic, interacting with both `app` and `timer` slices.

  - **Accesses:**

    - `fizz`, `buzz` from the `app` slice via `useSelector`.
    - `time`, `running` from the `timer` slice via `useSelector`.

  - **Dispatches:**
    - `setTime(value)`
    - `setRunning(value)`
    - `resetTimerState()`
    - `setPage('settings')`
    - `setFizzBuzzLocked(boolean)`

## **Styles and Design Guidelines**

    The application follows specific design requirements to ensure a consistent and user-friendly interface.

### **Global Styling**

- **Font Family**: Arial
- **Text Color**: #707070
- **Alignment**: All content is centered both horizontally and vertically.
- **Buttons**: All buttons will have a pointer set for their cursor.

### **Component Styling**

### **Settings Page**

- **Header**:
  - Font size: `30px`
  - Font weight: `bold`
- **Input Labels**: Font size `16px`.
- **Input Fields**:
  - Width: `100px`
  - Padding: `8px 16px`
  - Border: `1px solid #707070`
  - Background: `#F5F5F5`
  - Border-radius: `5px`
  - Font size: `16px`
- **"Go to Timer >" Button**:
  - Border: `2px solid #707070`
  - Padding: `15px 30px`
  - Font size: `16px`
  - Font weight: `bold`
  - Border-radius: `5px`

### **Timer Page**

- **Back Button ("\< Set Times")**:
  - Positioned at the top-left
  - Same styling as "Go to Timer >" button
- **"Time Elapsed" Header**: Font size `30px`
- **Counter Container**:

  - Font size: `30px`
  - Font weight: `bold`
  - Border: `2px solid #707070`
  - Background: `#F5F5F5`
  - Padding: `28px`
  - Width: `640px`
  - Border-radius: `5px`

- **Control Buttons ("Start" & "Stop" / Reset")**:
  - Width: `200px`
  - Padding: `15px`
  - Font size: `16px`
  - Font weight: `bold`
  - Border-radius: `5px`
- **Start Button**:
  - Background: `#5CCC87`
  - Margin-right: `30px`
- **Stop / Reset Button**:
  - Background: `#E66666`
- **Fizz Buzz Text**:
  Font size: `80px`
  Font weight: `bold`
  Margin-top: `65px`

## **Acknowledgements**

- **Original Author**: Michael Pantoja
- **Design Inspiration**: Based on specific design requirements from Tenet3.
- **Technologies**: Thanks to the open-source community for the tools that made this project possible.
