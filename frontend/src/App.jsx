"use client"

import "./App.css"

function App() {
  const handleClick = () => {
    alert("Hello!")
  }

  return (
    <div className="App">
      <div className="container">
        <h1>Employee Managemantwit</h1>
        <button onClick={handleClick} className="hello-button">
          hello
        </button>
      </div>
    </div>
  )
}

export default App
