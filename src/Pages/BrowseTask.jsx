import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch tasks on component mount
  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching tasks:", err);
        setLoading(false);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Discover <span className="text-teal-600">Freelance</span>{" "}
            Opportunities
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Find projects that match your skills and grow your freelance career.
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin h-10 w-10 border-4 border-teal-500 border-t-transparent rounded-full"></div>
          </div>
        ) : tasks.length === 0 ? (
          // No tasks available message
          <div className="text-center py-20 text-gray-600">
            <svg
              className="mx-auto h-20 w-20 mb-4 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No tasks available</h3>
            <p>Come back later or be the first to post one!</p>
          </div>
        ) : (
          // Tasks grid display
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-2xl shadow hover:shadow-lg transition-all duration-300 border border-gray-100 flex flex-col justify-between"
              >
                <div className="p-6">
                  {/* Task category & budget */}
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-teal-100 text-black text-md font-semibold px-3 py-1 rounded-full">
                      {task.category}
                    </span>
                    <span className="text-gray-900 font-bold text-lg">
                      ${task.budget}
                    </span>
                  </div>

                  {/* Task title */}
                  <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                    {task.title}
                  </h3>

                  {/* Task description */}
                  <p className="text-sm text-gray-800 mb-3 line-clamp-3">
                    {task.description}
                  </p>

                  {/* Deadline info */}
                  <div className="flex items-center text-sm text-gray-700">
                    <svg
                      className="w-4 h-4 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    Deadline: {task.deadline}
                  </div>
                </div>

                {/* View Details Button */}
                <div className="px-6 pb-6">
                  <Link
                    to={`/all-tasks/${task._id}`}
                    className="block text-center w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-lg hover:from-teal-600 hover:to-teal-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowseTasks;
