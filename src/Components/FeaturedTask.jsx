import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const FeaturedTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5000/featured-tasks") //  backend endpoint
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching featured tasks:", err);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-[#FAF7F5] rounded-2xl py-10 lg:py-20 px-6 sm:px-8 lg:px-16">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-[#43727A] mb-4">
            Featured <span className="text-teal-600">Tasks</span>
          </h2>
          <p className="text-md md:text-lg text-[#1E1E1E] max-w-2xl mx-auto">
            Explore urgent tasks with the nearest deadlines.
          </p>
        </div>

        {/* Loading */}
        {loading ? (
          <div className="flex justify-center items-center h-48">
            <div className="animate-spin h-8 w-8 border-4 border-teal-500 border-t-transparent rounded-full"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {tasks.map((task) => (
              <div
                key={task._id}
                className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-shadow duration-300 border border-teal-200 flex flex-col justify-between"
              >
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="bg-teal-100 text-black text-md font-semibold px-3 py-1 rounded-full">
                      {task.category}
                    </span>
                    <span className="text-gray-900 font-bold text-lg">
                      ${task.budget}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-[#43727A] mb-2 line-clamp-2">
                    {task.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3 line-clamp-3">
                    {task.description}
                  </p>

                  <div className="flex items-center text-sm text-teal-600">
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

                <div className="px-6 pb-6">
                  <Link
                    to={`/skillnest/all-tasks/${task._id}`}
                    className="block text-center w-full px-4 py-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white font-medium rounded-full hover:from-teal-600 hover:to-teal-700 transition"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CTA Button */}
        <div className="mt-16 text-center">
          <button
            onClick={() => navigate("/skillnest/all-tasks")}
            className="relative cursor-pointer px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full font-medium shadow-md hover:shadow-lg transition-all overflow-hidden group"
          >
            <span className="relative z-10">Browse All Tasks</span>
            <span className="absolute inset-0 bg-gradient-to-r from-teal-600 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity"></span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedTasks;
