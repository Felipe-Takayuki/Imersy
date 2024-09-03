import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { HomePage } from "./pages/home/home_page"
import { RegisterPage } from "./pages/register/register_page"
import { UserPage } from "./pages/user_page/userpage"


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/:bootcamp_id/register",
    element: <RegisterPage />
  },
  {
    path: "/home",
    element: <UserPage /> 
  }
])
export function App() {
  return <RouterProvider router={router} />
}