import {createBrowserRouter, RouterProvider} from "react-router-dom"
import {DashboardLayout, HomeLayout, Landing, Login, Register, Error} from "./pages/index"

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
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "dashboard",
        element: <DashboardLayout />,
      },
    ],
  },
])
const App = () => {
  return <RouterProvider router={router} />
}

export default App
