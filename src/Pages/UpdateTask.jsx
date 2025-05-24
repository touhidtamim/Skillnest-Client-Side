import React, { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../Provider/AuthProvider";

const UpdateTask = () => {
  const { id } = useParams(); // get task id from url
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

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

  // Fetch task data by id on mount
  useEffect(() => {
    if (!id) return;

    fetch(`http://localhost:5000/tasks/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Task not found");
        return res.json();
      })
      .then((data) => {
        setTaskData({
          title: data.title || "",
          category: data.category || "",
          description: data.description || "",
          deadline: data.deadline || "",
          budget: data.budget || "",
          username: data.username || user?.displayName || "",
          email: data.email || user?.email || "",
        });
      })
      .catch((err) => alert(err.message))
      .finally(() => setLoading(false));
  }, [id, user]);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit updated task
  const handleSubmit = (e) => {
    e.preventDefault();

    // You may want to add validation here

    fetch(`http://localhost:5000/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(taskData),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to update task");
        return res.json();
      })
      .then(() => {
        alert("Task updated successfully!");
        navigate("/skillnest/my-task"); // Redirect to My Tasks page after update
      })
      .catch((err) => alert(err.message));
  };

  if (loading) return <p>Loading task data...</p>;

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Update Task</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* User Name (read-only) */}
        <div>
          <label className="block mb-1 font-semibold">User Name</label>
          <input
            type="text"
            name="username"
            value={taskData.username}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* User Email (read-only) */}
        <div>
          <label className="block mb-1 font-semibold">User Email</label>
          <input
            type="email"
            name="email"
            value={taskData.email}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Title */}
        <div>
          <label className="block mb-1 font-semibold">Title</label>
          <input
            type="text"
            name="title"
            value={taskData.title}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 font-semibold">Category</label>
          <input
            type="text"
            name="category"
            value={taskData.category}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-semibold">Description</label>
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
            rows={4}
          />
        </div>

        {/* Deadline */}
        <div>
          <label className="block mb-1 font-semibold">Deadline</label>
          <input
            type="date"
            name="deadline"
            value={taskData.deadline}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Budget */}
        <div>
          <label className="block mb-1 font-semibold">Budget (USD)</label>
          <input
            type="number"
            name="budget"
            value={taskData.budget}
            onChange={handleChange}
            min="0"
            required
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateTask;
