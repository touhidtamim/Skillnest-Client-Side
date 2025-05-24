import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../Provider/AuthProvider";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  useEffect(() => {
    if (!userEmail) return; // wait until userEmail is available

    setLoading(true);
    fetch(
      `http://localhost:5000/my-tasks?email=${encodeURIComponent(userEmail)}`
    )
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch tasks:", error);
        setLoading(false);
      });
  }, [userEmail]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
      })
        .then((res) => {
          if (res.ok) {
            alert("Task deleted successfully.");
            setTasks(tasks.filter((task) => task._id !== id));
          } else {
            alert("Failed to delete task.");
          }
        })
        .catch(() => alert("Failed to delete task."));
    }
  };

  if (loading) return <p>Loading your tasks...</p>;
  if (!userEmail) return <p>Please login to view your tasks.</p>;
  if (tasks.length === 0) return <p>No tasks posted yet.</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">My Posted Tasks</h2>
      <table className="w-full border border-gray-300 rounded">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border border-gray-300">Title</th>
            <th className="p-2 border border-gray-300">Category</th>
            <th className="p-2 border border-gray-300">Deadline</th>
            <th className="p-2 border border-gray-300">Budget</th>
            <th className="p-2 border border-gray-300">Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map(({ _id, title, category, deadline, budget }) => (
            <tr key={_id} className="hover:bg-gray-100">
              <td className="p-2 border border-gray-300">{title}</td>
              <td className="p-2 border border-gray-300">{category}</td>
              <td className="p-2 border border-gray-300">{deadline}</td>
              <td className="p-2 border border-gray-300">${budget}</td>
              <td className="p-2 border border-gray-300 space-x-2">
                <button
                  onClick={() => alert("Update functionality coming soon!")}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Update
                </button>
                <button
                  onClick={() => handleDelete(_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
                <button
                  onClick={() => alert("View bids functionality coming soon!")}
                  className="bg-green-500 text-white px-3 py-1 rounded"
                >
                  Bids
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyTask;
