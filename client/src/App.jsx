import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
// import Login from "./pages/auth/Login";
import RegisterOwner from "./pages/auth/RegisterOwner";

function App() {
  return <RouterProvider router={router} />;
  // return <RegisterOwner />;
}

export default App;
