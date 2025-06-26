import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const MyTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const userEmail = user?.email;
  const navigate = useNavigate();

  // Fetch user's tasks on mount or when userEmail changes
  useEffect(() => {
    if (!userEmail) return;

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
        Swal.fire("Error", "Failed to fetch tasks.", "error");
        setLoading(false);
      });
  }, [userEmail]);

  // Confirm and delete a task by id
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You want to delete this task?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`http://localhost:5000/tasks/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (res.ok) {
              Swal.fire("Deleted!", "Task deleted successfully.", "success");
              setTasks(tasks.filter((task) => task._id !== id));
            } else {
              Swal.fire("Error", "Failed to delete task.", "error");
            }
          })
          .catch(() => Swal.fire("Error", "Failed to delete task.", "error"));
      }
    });
  };

  // Show bids count for a task using SweetAlert
  const handleViewBids = (taskId) => {
    fetch(`http://localhost:5000/tasks/${taskId}`)
      .then((res) => res.json())
      .then((task) => {
        const bidCount = task.bidsCount || 0;
        Swal.fire({
          title: "Task Bids",
          html: `<p>This task has <strong>${bidCount}</strong> bid${
            bidCount !== 1 ? "s" : ""
          }.</p>`,
          icon: "info",
          confirmButtonText: "Close",
        });
      })
      .catch(() => {
        Swal.fire("Error", "Failed to fetch bids.", "error");
      });
  };

  // Loading, unauthorized, and empty states
  if (loading) return <p className="text-center mt-6">Loading your tasks...</p>;
  if (!userEmail)
    return <p className="text-center mt-6">Please login to view your tasks.</p>;
  if (tasks.length === 0)
    return <p className="text-center mt-6">No tasks posted yet.</p>;

  // Main task list table
  return (
    <div className="max-w-4xl mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Posted Tasks</h2>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300 rounded min-w-[600px]">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border border-gray-300 text-left">Title</th>
              <th className="p-2 border border-gray-300 text-left">Category</th>
              <th className="p-2 border border-gray-300 text-left">Deadline</th>
              <th className="p-2 border border-gray-300 text-left">Budget</th>
              <th className="p-2 border border-gray-300 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(({ _id, title, category, deadline, budget }) => (
              <tr
                key={_id}
                className="hover:bg-gray-100 even:bg-gray-50 transition-colors"
              >
                <td className="p-2 border border-gray-300">{title}</td>
                <td className="p-2 border border-gray-300">{category}</td>
                <td className="p-2 border border-gray-300">{deadline}</td>
                <td className="p-2 border border-gray-300">${budget}</td>
                <td className="p-2 border border-gray-300 space-x-1 flex flex-wrap gap-2">
                  <button
                    onClick={() => navigate(`/update-task/${_id}`)}
                    className="bg-blue-500 text-white px-3 py-1 rounded flex-1 min-w-[70px] text-center hover:bg-blue-600 transition"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(_id)}
                    className="bg-red-500 text-white px-3 py-1 rounded flex-1 min-w-[70px] text-center hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleViewBids(_id)}
                    className="bg-teal-500 text-white px-3 py-1 rounded flex-1 min-w-[70px] text-center hover:bg-teal-600 transition"
                  >
                    Bids
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTask;
