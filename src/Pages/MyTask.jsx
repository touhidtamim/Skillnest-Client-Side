import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import {
  FiEdit,
  FiTrash2,
  FiDollarSign,
  FiClock,
  FiLoader,
  FiUsers,
} from "react-icons/fi";

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

  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[300px]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          className="text-teal-500 text-4xl mb-4"
        >
          <FiLoader />
        </motion.div>
        <motion.p
          initial={{ opacity: 0.5 }}
          animate={{ opacity: 1 }}
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 1.5,
          }}
          className="text-gray-600 text-lg"
        >
          Loading your tasks...
        </motion.p>
      </div>
    );
  }

  // No user state
  if (!userEmail) {
    return (
      <div className="text-center mt-10">
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          className="inline-block p-6 bg-white rounded-lg shadow-md border border-gray-200"
        >
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            Please login to view your tasks
          </h3>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
          >
            Go to Login
          </button>
        </motion.div>
      </div>
    );
  }

  // No tasks state
  if (tasks.length === 0) {
    return (
      <div className="text-center mt-10">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="inline-block p-8 bg-white rounded-lg shadow-md border border-gray-200 max-w-md"
        >
          <div className="text-gray-400 mb-4 text-5xl">
            <FiDollarSign className="inline-block" />
          </div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">
            No tasks posted yet
          </h3>
          <p className="text-gray-500 mb-4">
            You haven't posted any tasks yet. Create your first task to get
            started!
          </p>
          <button
            onClick={() => navigate("/dashboard/create-task")}
            className="px-4 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition"
          >
            Create New Task
          </button>
        </motion.div>
      </div>
    );
  }

  // Main Table
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="max-w-6xl mx-auto px-4 lg:px-0 py-8"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="text-3xl font-bold mb-8 text-gray-800 text-center"
      >
        My Posted Tasks
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="overflow-x-auto bg-white shadow-lg rounded-xl border border-gray-200"
      >
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-4 text-left font-medium">Title</th>
              <th className="px-6 py-4 text-left font-medium">Category</th>
              <th className="px-6 py-4 text-left font-medium">Deadline</th>
              <th className="px-6 py-4 text-left font-medium">Budget</th>
              <th className="px-6 py-4 text-center font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {tasks.map(({ _id, title, category, deadline, budget }, index) => (
              <motion.tr
                key={_id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="hover:bg-gray-50 transition-colors"
              >
                <td className="px-6 py-4 font-medium text-gray-800">{title}</td>
                <td className="px-6 py-4 capitalize text-gray-600">
                  {category}
                </td>
                <td className="px-6 py-4 text-gray-600">
                  <div className="flex items-center">
                    <FiClock className="mr-2 text-gray-400" />
                    {formatDate(deadline)}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-600">${budget}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => navigate(`/dashboard/update-task/${_id}`)}
                      className="flex items-center px-3 py-1 bg-blue-50 text-blue-600 rounded-md hover:bg-blue-100 transition"
                    >
                      <FiEdit className="mr-1" />
                      <span>Edit</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleDelete(_id)}
                      className="flex items-center px-3 py-1 bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
                    >
                      <FiTrash2 className="mr-1" />
                      <span>Delete</span>
                    </motion.button>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleViewBids(_id)}
                      className="flex items-center px-3 py-1 bg-emerald-50 text-emerald-600 rounded-md hover:bg-emerald-100 transition"
                    >
                      <FiUsers className="mr-1" />
                      <span>Bids</span>
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </motion.div>
    </motion.div>
  );
};

export default MyTask;
