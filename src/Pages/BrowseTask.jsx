import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const BrowseTasks = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks") // 🔁 Replace with your deployed backend URL later
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("Error fetching tasks:", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold mb-6 text-center">Browse Tasks</h2>

      {tasks.length === 0 ? (
        <p className="text-center">No tasks found</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.map((task) => (
            <div key={task._id} className="bg-white p-4 rounded-lg shadow">
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-sm text-gray-600 mb-1">
                Category: {task.category}
              </p>
              <p className="text-sm mb-1">Budget: ${task.budget}</p>
              <p className="text-sm mb-2">Deadline: {task.deadline}</p>
              <Link to={`/skillnest/all-tasks/${task._id}`}>
                <button className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700">
                  See Details
                </button>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default BrowseTasks;
