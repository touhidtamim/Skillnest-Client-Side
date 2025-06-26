import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";
import Swal from "sweetalert2";

const UpdateTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const categories = [
    "Web Development",
    "Mobile Development",
    "UI/UX Design",
    "Graphic Design",
    "Content Writing",
    "Digital Marketing",
    "Social Media Management",
    "SEO Services",
    "Data Entry",
    "Video Editing",
    "Audio Production",
    "Business Consulting",
    "Photography",
    "Other",
  ];

  const [taskData, setTaskData] = useState({
    title: "",
    category: "",
    description: "",
    deadline: "",
    budget: "",
    username: user?.displayName || "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks/${id}`);
        if (!response.ok) throw new Error("Task not found");

        const data = await response.json();
        setTaskData({
          title: data.title || "",
          category: data.category || "",
          description: data.description || "",
          deadline: data.deadline ? data.deadline.split("T")[0] : "",
          budget: data.budget || "",
          username: data.username || user?.displayName || "",
          email: data.email || user?.email || "",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: error.message,
          icon: "error",
          confirmButtonText: "OK",
        });
        navigate("/my-task");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, user, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      if (!taskData.title || !taskData.category || !taskData.deadline) {
        throw new Error("Please fill in all required fields");
      }

      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...taskData,
          budget: parseFloat(taskData.budget) || 0,
        }),
      });

      if (!response.ok) throw new Error("Failed to update task");

      await Swal.fire({
        title: "Success!",
        text: "Task updated successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/my-task");
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: error.message,
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Update Task
      </h2>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* User Name (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Name
            </label>
            <input
              type="text"
              name="username"
              value={taskData.username}
              readOnly
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
            />
          </div>

          {/* User Email (read-only) */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              User Email
            </label>
            <input
              type="email"
              name="email"
              value={taskData.email}
              readOnly
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
            />
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter task title"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category *
          </label>
          <select
            name="category"
            value={taskData.category}
            onChange={handleChange}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={5}
            placeholder="Describe your task in detail..."
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Deadline */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline *
            </label>
            <input
              type="date"
              name="deadline"
              value={taskData.deadline}
              onChange={handleChange}
              min={new Date().toISOString().split("T")[0]}
              required
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Budget */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget (USD)
            </label>
            <input
              type="number"
              name="budget"
              value={taskData.budget}
              onChange={handleChange}
              min="0"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={updating}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              updating
                ? "bg-teal-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {updating ? (
              <span className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Updating...
              </span>
            ) : (
              "Update Task"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateTask;
