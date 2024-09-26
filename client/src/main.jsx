import {createRoot} from "react-dom/client"
import App from "./App.jsx"
import "./index.css"
import customFetch from "./utils/customFetch.js"
const data = await customFetch.get("/test")
console.log(data)

createRoot(document.getElementById("root")).render(<App />)
