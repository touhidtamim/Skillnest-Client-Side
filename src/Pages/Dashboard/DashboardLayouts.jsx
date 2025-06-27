import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col lg:flex-row">
      {/* Sidebar (Left on Desktop, Top on Mobile/Tablet) */}
      <aside className="bg-white shadow-md w-full lg:w-64 px-4 py-4 lg:px-6 lg:py-8 flex flex-col lg:min-h-screen">
        {/* Title (only on small screens) */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4 lg:hidden">
          Dashboard
        </h2>

        <nav className="flex flex-wrap lg:flex-col gap-2 lg:gap-3 text-sm font-medium">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition ${
                isActive
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            Overview
          </NavLink>

          <NavLink
            to="/dashboard/my-profile"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition ${
                isActive
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            My Profile
          </NavLink>

          <NavLink
            to="/dashboard/find-jobs"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition ${
                isActive
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            Find Jobs
          </NavLink>

          <NavLink
            to="/dashboard/add-task"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition ${
                isActive
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            Post a Job
          </NavLink>

          <NavLink
            to="/dashboard/my-task"
            className={({ isActive }) =>
              `px-4 py-2 rounded-md transition ${
                isActive
                  ? "bg-teal-50 text-teal-600 font-semibold"
                  : "text-gray-600 hover:bg-gray-100"
              }`
            }
          >
            My Posted Jobs
          </NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 overflow-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
