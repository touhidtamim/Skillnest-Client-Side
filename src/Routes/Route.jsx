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
import PrivacyPolicy from "./../Pages/PrivacyPolicy";
import TermsAndConditions from "./../Pages/TermsAndConditions";
import PrivateRouter from "./PrivateRoute";
import TaskDetails from "./../Pages/TaskDetails";
import UpdateTask from "../Pages/UpdateTask";

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
        path: "/all-tasks",
        element: <BrowseTask></BrowseTask>,
      },

      {
        path: "/all-tasks/:id",
        element: (
          <PrivateRouter>
            <TaskDetails></TaskDetails>
          </PrivateRouter>
        ),
      },

      {
        path: "/add-task",
        element: (
          <PrivateRouter>
            <AddTask></AddTask>
          </PrivateRouter>
        ),
      },

      {
        path: "/my-task",
        element: (
          <PrivateRouter>
            <MyTask></MyTask>
          </PrivateRouter>
        ),
      },

      {
        path: "/update-task/:id",
        element: (
          <PrivateRouter>
            <UpdateTask></UpdateTask>
          </PrivateRouter>
        ),
      },

      {
        path: "/my-profile",
        element: (
          <PrivateRouter>
            <MyProfile></MyProfile>
          </PrivateRouter>
        ),
      },

      {
        path: "/contact",
        element: <Contact></Contact>,
      },

      {
        path: "/about",
        element: <About></About>,
      },

      {
        path: "/faq",
        element: <FAQ></FAQ>,
      },

      {
        path: "/privacy-policy",
        element: <PrivacyPolicy></PrivacyPolicy>,
      },

      {
        path: "/terms-conditions",
        element: <TermsAndConditions></TermsAndConditions>,
      },

      {
        path: "/login",
        element: <Login></Login>,
      },

      {
        path: "/register",
        element: <Register></Register>,
      },
    ],
  },
]);

export default router;
