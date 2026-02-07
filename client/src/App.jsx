import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import Login from "./pages/auth/login";

function App() {
  // return <RouterProvider router={router} />;
  return <Login />;
}

export default App;
