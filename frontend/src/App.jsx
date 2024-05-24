import Navbar from "./components/navbar";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./screens/home";
import Login from "./screens/login";
import Register from "./screens/register";
import ForgetPassword from "./screens/forget-password";
import UpdatePassword from "./screens/update-password";
import Dashboard from "./screens/dashboard";
import Layout from "./Layout";
import LinkPreview from "./screens/link";

const App = () => {
  const router = createBrowserRouter([
    {
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "/update-password",
          element: <UpdatePassword />,
        },
        {
          path: "/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/:id",
          element: <LinkPreview />,
        },
      ],
    },
  ]);

  return (
    <main className="bg-[#1d232a] flex justify-center">
      <RouterProvider router={router} />
    </main>
  );
};

export default App;
