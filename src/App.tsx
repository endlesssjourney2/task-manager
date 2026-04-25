import { RouterProvider } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import { router } from "./router";

const App = () => {
  const { user } = useAuth();

  return <RouterProvider router={router} key={user ? user.id : "guest"} />;
};

export default App;
