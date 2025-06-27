import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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

  const urgencyLevels = [
    { value: "low", label: "Low (1-2 weeks)" },
    { value: "medium", label: "Medium (3-7 days)" },
    { value: "high", label: "High (1-3 days)" },
    { value: "urgent", label: "Urgent (24 hours)" },
  ];

  const [taskData, setTaskData] = useState({
    title: "",
    category: "",
    description: "",
    deadline: "",
    budget: "",
    image: "",
    skillsRequired: [],
    urgency: "",
    username: user?.displayName || "",
    email: user?.email || "",
  });

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchTask = async () => {
      try {
        const response = await fetch(
          `https://skillnest-server-side.vercel.app/tasks/${id}`
        );
        if (!response.ok) throw new Error("Task not found");

        const data = await response.json();

        // Verify task belongs to current user
        if (data.email !== user?.email) {
          throw new Error("You can only edit your own tasks");
        }

        setTaskData({
          title: data.title || "",
          category: data.category || "",
          description: data.description || "",
          deadline: data.deadline ? data.deadline.split("T")[0] : "",
          budget: data.budget || "",
          image: data.image || "",
          skillsRequired: data.skillsRequired || [],
          urgency: data.urgency || "",
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
        navigate("/dashboard/my-task");
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

  const handleSkillsChange = (e) => {
    const skills = e.target.value.split(",").map((skill) => skill.trim());
    setTaskData((prev) => ({
      ...prev,
      skillsRequired: skills,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUpdating(true);

    try {
      if (!taskData.title || !taskData.category || !taskData.deadline) {
        throw new Error("Please fill in all required fields");
      }

      const response = await fetch(
        `https://skillnest-server-side.vercel.app/tasks/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...taskData,
            budget: parseFloat(taskData.budget) || 0,
            skillsRequired: taskData.skillsRequired,
          }),
        }
      );

      if (!response.ok) throw new Error("Failed to update task");

      await Swal.fire({
        title: "Success!",
        text: "Task updated successfully!",
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      navigate("/dashboard/my-task");
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
    <div className="max-w-4xl mx-auto px-4 py-6">
      {/* Compact Left-Aligned Breadcrumb */}
      <div className="mb-6">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-1  md:space-x-2 text-sm">
            <li>
              <Link
                to="/dashboard"
                className="text-gray-500 hover:text-blue-600"
              >
                Dashboard
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li>
              <Link
                to="/dashboard/my-task"
                className="text-gray-500 hover:text-blue-600"
              >
                My Tasks
              </Link>
            </li>
            <li className="text-gray-400">/</li>
            <li className="text-gray-700 font-medium">Update Task</li>
          </ol>
        </nav>
      </div>
      {/* Form Card with Centered Heading */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Update Task
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* First Row - Title and Category */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
          </div>

          {/* Second Row - Image and Budget */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Image URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="url"
                name="image"
                value={taskData.image}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Budget ($)
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

          {/* Third Row - Deadline and Urgency */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Urgency
              </label>
              <select
                name="urgency"
                value={taskData.urgency}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Select urgency level</option>
                {urgencyLevels.map((level) => (
                  <option key={level.value} value={level.value}>
                    {level.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Skills Required */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Skills Required (comma separated)
            </label>
            <input
              type="text"
              name="skillsRequired"
              value={taskData.skillsRequired.join(", ")}
              onChange={handleSkillsChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="React, Node.js, MongoDB"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={taskData.description}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={5}
              required
              placeholder="Describe your task in detail..."
            />
          </div>

          {/* Readonly User Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Email
              </label>
              <input
                type="email"
                value={taskData.email}
                readOnly
                className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Your Name
              </label>
              <input
                type="text"
                value={taskData.username}
                readOnly
                className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg cursor-not-allowed"
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
    </div>
  );
};

export default UpdateTask;
