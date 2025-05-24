import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../Provider/AuthProvider";

const AddTask = () => {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);

  const handleAddTask = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;
    const title = form.title.value;
    const category = form.category.value;
    const description = form.description.value;
    const deadline = form.deadline.value;
    const budget = parseFloat(form.budget.value);
    const email = user?.email;
    const name = user?.displayName;

    const newTask = {
      title,
      category,
      description,
      deadline,
      budget,
      email,
      name,
    };

    try {
      const res = await fetch("http://localhost:5000/tasks", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTask),
      });

      const data = await res.json();
      if (data.insertedId || data.acknowledged) {
        Swal.fire("Success!", "Task added successfully!", "success");
        form.reset();
      }
    } catch (error) {
      console.error("Failed to add task:", error);
      Swal.fire("Error", "Something went wrong!", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Add a Task</h2>
      <form onSubmit={handleAddTask} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Task Title"
          className="w-full p-2 border rounded"
          required
        />

        <select name="category" className="w-full p-2 border rounded" required>
          <option value="">Select Category</option>
          <option value="Web Development">Web Development</option>
          <option value="Design">Design</option>
          <option value="Writing">Writing</option>
          <option value="Marketing">Marketing</option>
        </select>

        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="date"
          name="deadline"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="number"
          name="budget"
          placeholder="Budget"
          className="w-full p-2 border rounded"
          required
        />

        <input
          type="email"
          value={user?.email || ""}
          readOnly
          className="w-full p-2 border bg-gray-100 rounded"
        />
        <input
          type="text"
          value={user?.displayName || ""}
          readOnly
          className="w-full p-2 border bg-gray-100 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded"
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Task"}
        </button>
      </form>
    </div>
  );
};

export default AddTask;
