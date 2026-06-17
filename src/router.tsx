import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout.tsx";
import SignIn from "./pages/SignIn/SignIn.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import Home from "./pages/Project/Home.tsx";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.tsx";
import Project from "./pages/Tasks/Project.tsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <SignIn />,
    },
    { path: "signup", element: <SignUp /> },
    {
      path: "/app",
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      children: [
        { index: true, element: <Home /> },
        { path: "project/:id", element: <Project /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
