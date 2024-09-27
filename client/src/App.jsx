import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {DashboardLayout, HomeLayout, Landing, Login, Register, Error, Admin, AddJob, AllJobs, Stats, Profile} from "./pages/index"
import {action as registerAction} from "./pages/Register"
const checkDefaultTheme = () => {
  const isDarkTheme = localStorage.getItem("darkTheme") === "true"
  document.body.classList.toggle("dark-theme", isDarkTheme)
  return isDarkTheme
}

const isDarkThemeEnabled = checkDefaultTheme()

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout />, //all the children will be displayed inside the <OUTLET/> in the homelayout page
    errorElement: <Error />, //error bubble ups in React
    children: [
      //all the routes will be relative to "/"
      {
        index: true,
        element: <Landing />, //this will be displayed when we visit the parent rout
      },
      {
        path: "register",
        element: <Register />,
        action: registerAction,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout isDarkThemeEnabled={isDarkThemeEnabled} />,
        children: [
          {
            index: true,
            element: <AddJob />,
          },
          {path: "stats", element: <Stats />},
          {
            path: "all-jobs",
            element: <AllJobs />,
          },

          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "admin",
            element: <Admin />,
          },
        ],
      },
    ],
  },
])
const App = () => {
  return <RouterProvider router={router} />
}

export default App
