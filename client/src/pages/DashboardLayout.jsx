import {Outlet} from "react-router-dom"
import Wrapper from "../assets/wrappers/Dashboard"
import BigSideBar from "../components/BigSideBar"
import NavBar from "../components/NavBar"
import SmallSideBar from "../components/SmallSideBar"
import {createContext, useContext, useState} from "react"

//creating context
const DashboardContext = createContext()

const DashboardLayout = ({isDarkThemeEnabled}) => {
  //temp
  const user = {name: "neer"}
  const [showSidebar, setShowSidebar] = useState(false)
  const [isDarkTheme, setIsDarkTheme] = useState(isDarkThemeEnabled)

  const toggleDarkTheme = () => {
    let newDarkTheme = !isDarkTheme
    setIsDarkTheme(newDarkTheme)
    document.body.classList.toggle("dark-theme", newDarkTheme)
    localStorage.setItem("darkTheme", newDarkTheme)
  }
  const toggleSidebar = () => {
    setShowSidebar((prev) => !prev)
  }
  const logoutUser = () => {
    console.log("log out user")
  }

  return (
    //wrapping with provider, and passing the values/function
    <DashboardContext.Provider value={{user, showSidebar, isDarkTheme, toggleDarkTheme, toggleSidebar, logoutUser}}>
      <Wrapper>
        <main className="dashboard">
          <SmallSideBar />
          <BigSideBar />
          <div>
            <NavBar />
            <div className="dashboard-page">
              <Outlet />
            </div>
          </div>
        </main>
      </Wrapper>
    </DashboardContext.Provider>
  )
}
//custom hook for using useContext in components
export let useDashboardContext = () => useContext(DashboardContext)
export default DashboardLayout
