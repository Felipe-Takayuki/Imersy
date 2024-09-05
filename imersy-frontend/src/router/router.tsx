import { createBrowserRouter } from "react-router-dom";
import { HomePage } from "../pages/home/home_page";
import { RegisterPage } from "../pages/register/register_page";
import { UserPage } from "../pages/user_page/userpage";
import  ProtectedRoute  from "./protect_router";
import { LoginPage } from "../pages/login/login_page";
import { MaterialClassPage } from "../pages/material/material";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />
    },
    {
      path: "/register",
      element: <RegisterPage />
    },
    {
      path: "/login",
      element: <LoginPage />
    },
    {
      path: "/user-page",
      element: (
        <ProtectedRoute>
          <UserPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user-page/material/:material_id",
      element: (
        <ProtectedRoute>
          <MaterialClassPage />
        </ProtectedRoute>
      )
    },
    {
      path: "*",
      element: <><h1>404 page not found</h1> </>
    }

  ])