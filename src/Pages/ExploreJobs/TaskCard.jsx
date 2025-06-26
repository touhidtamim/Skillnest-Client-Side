import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  return (
    <div className="bg-white rounded-2xl shadow hover:shadow-lg transition-all border border-gray-100 flex flex-col justify-between">
      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <span className="bg-teal-100 text-sm font-semibold px-3 py-1 rounded-full">
            {task.category}
          </span>
          <span className="font-bold text-sm">${task.budget}</span>
        </div>
        <h3 className="text-md font-semibold text-gray-800 mb-1 line-clamp-2">
          {task.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-3 mb-2">
          {task.description}
        </p>
        <p className="text-xs text-gray-500">Deadline: {task.deadline}</p>
      </div>
      <div className="px-4 pb-4">
        <Link
          to={`/all-tasks/${task._id}`}
          className="block text-center w-full px-4 py-2 bg-teal-500 text-white text-sm rounded-lg hover:bg-teal-600"
        >
          View Details
        </Link>
      </div>
    </div>
  );
};

export default TaskCard;
