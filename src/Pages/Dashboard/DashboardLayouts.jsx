import { NavLink, Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4">
        <h2 className="text-xl font-bold mb-6">Dashboard</h2>
        <nav className="space-y-2">
          <NavLink
            to="/dashboard"
            end
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-gray-700"
            }
          >
            Overview
          </NavLink>

          <NavLink
            to="/dashboard/add-task"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-gray-700"
            }
          >
            Add Task
          </NavLink>

          <NavLink
            to="/dashboard/my-task"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-gray-700"
            }
          >
            My Task
          </NavLink>

          <NavLink
            to="/dashboard/my-profile"
            className={({ isActive }) =>
              isActive ? "font-bold text-blue-500" : "text-gray-700"
            }
          >
            My Profile
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 bg-white">
        <Outlet />
      </main>
    </div>
  );
};

export default DashboardLayout;
