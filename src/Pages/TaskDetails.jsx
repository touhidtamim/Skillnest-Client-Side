import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

const TaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:5000/tasks/${id}`) // 🔁 Replace when deployed
      .then((res) => res.json())
      .then((data) => setTask(data));
  }, [id]);

  if (!task) {
    return <p className="text-center mt-8">Loading task details...</p>;
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">{task.title}</h2>
      <p>
        <strong>Category:</strong> {task.category}
      </p>
      <p>
        <strong>Description:</strong> {task.description}
      </p>
      <p>
        <strong>Deadline:</strong> {task.deadline}
      </p>
      <p>
        <strong>Budget:</strong> ${task.budget}
      </p>
      <p>
        <strong>Posted By:</strong> {task.name} ({task.email})
      </p>
    </div>
  );
};

export default TaskDetails;
