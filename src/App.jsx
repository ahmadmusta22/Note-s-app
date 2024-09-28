import "./App.css";
import Sidebar from "./SideBar/Sidebar";
import Register from "./Register/Register";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Layout/Layout";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Notes from "./Notes/Notes";
import {ToastContainer } from "react-toastify";
import AuthContextProvider from "./Context/AuthContext";
import ProtectedRoutes from "./ProtectedRoutes/ProtectedRoutes";



function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout></Layout>,
      children: [
        { index: true, element: <Login></Login> },
        { path: "/register", element: <Register></Register> },
        { path: "/home", element: <ProtectedRoutes><Home></Home></ProtectedRoutes> },
        { path: "/notes", element: <ProtectedRoutes><Notes></Notes></ProtectedRoutes> },
      ],
    },
  ]);

  return (
    <>
     <AuthContextProvider>
     <RouterProvider router={router}></RouterProvider>
     <ToastContainer />
     </AuthContextProvider>
    </>
  );
}

export default App;
