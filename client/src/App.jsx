import { RouterProvider } from "react-router-dom";
import { router } from "./app/router";
import { Toaster } from "react-hot-toast";
// import Login from "./pages/auth/Login";
// import RegisterOwner from "./pages/auth/RegisterOwner";

function App() {
  return (
    <>
      <RouterProvider router={router} />
      <Toaster position="top-right" />
    </>
   );
}

export default App;
