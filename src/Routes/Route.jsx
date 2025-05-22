import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./../Layouts/MainLayout";
import NotFound from "../Components/NotFound";
import Home from "../Pages/Home";
import BrowseTask from "../Pages/BrowseTask";
import AddTask from "../Pages/AddTask";
import MyTask from "../Pages/MyTask";
import MyProfile from "./../Pages/MyProfile";
import Login from "./../Pages/Login";
import Register from "./../Pages/Register";
import Contact from "./../Pages/Contact";
import About from "./../Pages/About";
import FAQ from "./../Pages/FAQ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },

      {
        path: "/skillnest/all-tasks",
        element: <BrowseTask></BrowseTask>,
      },

      {
        path: "/skillnest/add-task",
        element: <AddTask></AddTask>,
      },

      {
        path: "/skillnest/my-task",
        element: <MyTask></MyTask>,
      },

      {
        path: "/skillnest/my-profile",
        element: <MyTask></MyTask>,
      },

      {
        path: "/skillnest/my-task",
        element: <MyProfile></MyProfile>,
      },

      {
        path: "/skillnest/contact",
        element: <Contact></Contact>,
      },

      {
        path: "/skillnest/about",
        element: <About></About>,
      },

      {
        path: "/skillnest/faq",
        element: <FAQ></FAQ>,
      },

      {
        path: "/skillnest/login",
        element: <Login></Login>,
      },

      {
        path: "/skillnest/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
