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

  // States
  if (loading)
    return (
      <p className="text-center mt-6 text-gray-500">Loading your tasks...</p>
    );
  if (!userEmail)
    return (
      <p className="text-center mt-6 text-gray-500">
        Please login to view your tasks.
      </p>
    );
  if (tasks.length === 0)
    return (
      <p className="text-center mt-6 text-gray-500">No tasks posted yet.</p>
    );

  // Main Table
  return (
    <div className="max-w-6xl mx-auto px-4 lg:px-0 py-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        My Posted Tasks
      </h2>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-gray-100 text-gray-700 text-left">
            <tr>
              <th className="px-4 py-3 border-b whitespace-nowrap">Title</th>
              <th className="px-4 py-3 border-b whitespace-nowrap">Category</th>
              <th className="px-4 py-3 border-b whitespace-nowrap">Deadline</th>
              <th className="px-4 py-3 border-b whitespace-nowrap">Budget</th>
              <th className="px-4 py-3 border-b text-center whitespace-nowrap">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {tasks.map(({ _id, title, category, deadline, budget }) => (
              <tr
                key={_id}
                className="border-t hover:bg-gray-50 transition-colors"
              >
                <td className="px-4 py-3 whitespace-nowrap">{title}</td>
                <td className="px-4 py-3 whitespace-nowrap">{category}</td>
                <td className="px-4 py-3 whitespace-nowrap">{deadline}</td>
                <td className="px-4 py-3 whitespace-nowrap">${budget}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    <button
                      onClick={() => navigate(`/dashboard/update-task/${_id}`)}
                      className="bg-blue-500 cursor-pointer hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(_id)}
                      className="bg-red-500 cursor-pointer hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => handleViewBids(_id)}
                      className="bg-emerald-500 cursor-pointer hover:bg-emerald-600 text-white px-3 py-1 rounded text-xs"
                    >
                      Bids
                    </button>
                  </div>
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
