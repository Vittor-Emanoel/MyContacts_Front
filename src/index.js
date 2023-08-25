import React from "react"
import ReactDOM from "react-dom"
import App from "./components/App/Index"

import "./lib/EventManager"

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
)
