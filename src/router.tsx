import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout.tsx";
import Home from "./pages/Home/Home.tsx";
import SignIn from "./pages/Auth/SignIn/SignIn.tsx";
import SignUp from "./pages/Auth/SignUp/SignUp.tsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <RootLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "/signin", element: <SignIn /> },
        { path: "/signup", element: <SignUp /> },
      ],
    },
  ],
  {
    basename: import.meta.env.BASE_URL,
  },
);
