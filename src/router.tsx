import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout.tsx";
import SignIn from "./pages/SignIn/SignIn.tsx";
import SignUp from "./pages/SignUp/SignUp.tsx";
import Home from "./pages/Project/Home.tsx";
import Project from "./pages/Tasks/Project.tsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "signin", element: <SignIn /> },
        { path: "signup", element: <SignUp /> },
        { path: "project/:id", element: <Project /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
