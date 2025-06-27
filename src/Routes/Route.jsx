import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./../Layouts/MainLayout";
import NotFound from "../Components/NotFound";
import MyProfile from "./../Pages/MyProfile";
import Login from "./../Pages/Login";
import Register from "./../Pages/Register";
import Contact from "../Pages/Contact/Contact";
import About from "../Pages/About/About";
import FAQ from "../Pages/FaQ/FAQ";
import PrivacyPolicy from "../Pages/Legal/PrivacyPolicy";
import TermsAndConditions from "../Pages/Legal/TermsAndConditions";
import PrivateRouter from "./PrivateRoute";
import TaskDetails from "./../Pages/TaskDetails";
import UpdateTask from "../Pages/UpdateTask";
import ExploreJobs from "../Pages/ExploreJobs/ExploreJobs";
import Home from "./../Pages/Home/Home";
import AllFreelancers from "./../Pages/AllFreelancers/AllFreelancers";
import FreelancerDetails from "../Pages/AllFreelancers/FreelsncersDetails";
import DashboardLayouts from "../Pages/Dashboard/DashboardLayouts";
import Overview from "./../Pages/Dashboard/Overview";
import AddTask from "./../Pages/AddTask";
import MyTask from "./../Pages/MyTask";
import FindJobs from "../Pages/Dashboard/FindJobs";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout></MainLayout>,
    errorElement: <NotFound></NotFound>,
    children: [
      {
        path: "/",
        element: <Home />,
      },

      {
        path: "/freelancers",
        element: <AllFreelancers />,
      },

      {
        path: "/freelancers/:id",
        element: (
          <PrivateRouter>
            <FreelancerDetails />
          </PrivateRouter>
        ),
      },

      {
        path: "/all-tasks",
        element: <ExploreJobs />,
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
        path: "/dashboard",
        element: (
          <PrivateRouter>
            <DashboardLayouts />
          </PrivateRouter>
        ),
        children: [
          {
            index: true,
            element: <Overview />,
          },
          {
            path: "find-jobs",
            element: <FindJobs></FindJobs>,
          },
          {
            path: "add-task",
            element: <AddTask></AddTask>,
          },
          {
            path: "my-task",
            element: <MyTask></MyTask>,
          },

          {
            path: "update-task/:id",
            element: <UpdateTask></UpdateTask>,
          },

          {
            path: "my-profile",
            element: <MyProfile></MyProfile>,
          },
        ],
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
