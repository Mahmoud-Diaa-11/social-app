import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Login from "./Authentication/Login/Login";
import Register from "./Authentication/Register/Register";
import { HeroUIProvider } from "@heroui/react";
import AuthContextProvider from "./context/AuthContext";
import Profile from "./pages/Profile";
import ProtectRoutes from "./ProtectRoutes/ProtectRoutes";
import Home from "./pages/Home";
import SinglePost from "./pages/SinglePost";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ChangePassword from "./pages/ChangePassword";
import NotFound from "./pages/NotFound";

const client = new QueryClient();

const routers = createBrowserRouter([
  {
    path: "",
    element: <Layout />,
    children: [
      { index: true, element: <Login /> },
      { path: "register", element: <Register /> },

      {
        path: "home",
        element: (
          <ProtectRoutes>
            <Home />
          </ProtectRoutes>
        ),
      },
      {
        path: "profile",
        element: (
          <ProtectRoutes>
            <Profile />
          </ProtectRoutes>
        ),
      },
      {
        path: "singlepost/:id",
        element: (
          <ProtectRoutes>
            <SinglePost />
          </ProtectRoutes>
        ),
      },
      {
        path: "changePassword",
        element: (
          <ProtectRoutes>
            <ChangePassword />
          </ProtectRoutes>
        ),
      },
      { path: "*", element: <NotFound /> },
    ],
  },
]);
function App() {
  return (
    <>
      <QueryClientProvider client={client}>
        <HeroUIProvider>
          <AuthContextProvider>
            <RouterProvider router={routers}></RouterProvider>
          </AuthContextProvider>
        </HeroUIProvider>
      </QueryClientProvider>
    </>
  );
}

export default App;
