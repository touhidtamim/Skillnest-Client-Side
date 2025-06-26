import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  // Predefined task categories
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
    "Virtual Assistant",
    "Video Editing",
    "Audio Production",
    "Business Consulting",
    "Photography",
    "Other",
  ];

  // Urgency levels
  const urgencyLevels = [
    { value: "low", label: "Low (1-2 weeks)" },
    { value: "medium", label: "Medium (3-7 days)" },
    { value: "high", label: "High (1-3 days)" },
    { value: "urgent", label: "Urgent (24 hours)" },
  ];

  // Handle form submission to add a new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const formData = new FormData(form);

    // Prepare task data from form inputs & current user info
    const taskData = {
      title: formData.get("title"),
      category: formData.get("category"),
      description: formData.get("description"),
      deadline: formData.get("deadline"),
      budget: parseFloat(formData.get("budget")),
      image: formData.get("image"),
      skillsRequired: formData
        .get("skillsRequired")
        .split(",")
        .map((skill) => skill.trim()),
      urgency: formData.get("urgency"),
      proposalCount: 0, // Initialize with 0 proposals
      email: user?.email,
      name: user?.displayName,
      status: "open", // Default status
      createdAt: new Date().toISOString(),
    };

    try {
      // POST request to add task
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      });

      const data = await res.json();

      // Show success alert if insertion acknowledged
      if (data.insertedId || data.acknowledged) {
        await Swal.fire({
          title: "Success!",
          text: "Task added successfully!",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
        form.reset(); // Clear form after success
      }
    } catch (error) {
      console.error("Failed to add task:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to add task. Please try again.",
        icon: "error",
        confirmButtonText: "OK",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
        Add a New Task
      </h2>
      <form onSubmit={handleAddTask} className="space-y-6">
        {/* First Row - Title and Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Task Title Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Title *
            </label>
            <input
              type="text"
              name="title"
              placeholder="e.g. Build a responsive website"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Category Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
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
          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Task Image (URL)
            </label>
            <input
              type="url"
              name="image"
              placeholder="https://example.com/image.jpg"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Budget Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Budget ($) *
            </label>
            <input
              type="number"
              name="budget"
              placeholder="e.g. 100"
              min="1"
              step="0.01"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Third Row - Deadline and Urgency */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Deadline Input */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Deadline *
            </label>
            <input
              type="date"
              name="deadline"
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Urgency Select */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urgency Level *
            </label>
            <select
              name="urgency"
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
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
            Skills Required (comma separated) *
          </label>
          <input
            type="text"
            name="skillsRequired"
            placeholder="e.g. React, Node.js, MongoDB"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Description Textarea */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Detailed Description *
          </label>
          <textarea
            name="description"
            placeholder="Describe your task in detail including requirements, deliverables, and any special instructions..."
            rows="6"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
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
              value={user?.email || ""}
              readOnly
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Name
            </label>
            <input
              type="text"
              value={user?.displayName || ""}
              readOnly
              className="w-full p-3 border border-gray-300 bg-gray-100 rounded-lg"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-medium text-white transition-colors ${
              loading
                ? "bg-teal-400 cursor-not-allowed"
                : "bg-teal-600 hover:bg-teal-700"
            }`}
          >
            {loading ? (
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
                Processing...
              </span>
            ) : (
              "Publish Task"
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddTask;
