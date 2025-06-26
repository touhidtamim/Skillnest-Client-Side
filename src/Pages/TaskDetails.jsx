import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TaskDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [bidsCount, setBidsCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [bidLoading, setBidLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    fetch(`http://localhost:5000/tasks/${id}`)
      .then(async (res) => {
        if (!res.ok) {
          const errorData = await res.json().catch(() => ({}));
          throw new Error(errorData.error || "Failed to fetch task");
        }
        return res.json();
      })
      .then((data) => {
        setTask(data);
        setBidsCount(data.bidsCount || 0);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id]);

  const handleBid = async () => {
    setBidLoading(true);
    try {
      const res = await fetch(`http://localhost:5000/tasks/${id}/bid`, {
        method: "PATCH",
      });
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Failed to bid");
      }

      setBidsCount(data.bidsCount);
      toast.success("Bid placed successfully!");
    } catch (err) {
      toast.error(err.message);
    } finally {
      setBidLoading(false);
    }
  };

  const handleBack = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h2 className="text-2xl font-bold text-red-600 mb-2">
            Error Loading Task
          </h2>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <ToastContainer position="top-center" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            Task Details
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            View and bid on this freelance opportunity
          </p>
        </div>

        {/* Bid Status */}
        {bidsCount > 0 && (
          <div className="bg-teal-50 border border-teal-200 rounded-lg p-4 mb-8">
            <p className="text-teal-800 font-medium">
              You've bid for {bidsCount}{" "}
              {bidsCount === 1 ? "opportunity" : "opportunities"}
            </p>
          </div>
        )}

        {/* Task Card */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-teal-500 to-teal-600 p-6">
            <div className="flex justify-between items-start">
              <div>
                <span className="inline-block px-3 py-1 text-xs font-semibold rounded-full bg-teal-100 text-teal-800 mb-2">
                  {task.category}
                </span>
                <h2 className="text-2xl font-bold text-white">{task.title}</h2>
              </div>
              <div className="text-right">
                <p className="text-xl font-bold text-white">${task.budget}</p>
                <p className="text-teal-100 text-sm">Budget</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Description
                </h3>
                <p className="text-gray-700 whitespace-pre-line">
                  {task.description}
                </p>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Details
                </h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Deadline
                    </p>
                    <p className="text-gray-700">
                      {task.deadline
                        ? new Date(task.deadline).toLocaleDateString()
                        : "Flexible"}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Posted By
                    </p>
                    <p className="text-gray-700">
                      {task.name || "Anonymous"} (
                      {task.email || "Email not provided"})
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <p className="text-gray-700">Open for bids</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-t border-gray-200 pt-6 flex justify-between  flex-col md:flex-row gap-4">
              <button
                onClick={handleBack}
                className="w-full cursor-pointer md:w-auto px-6 py-3 rounded-lg font-medium border border-gray-300 text-gray-700 hover:bg-gray-100 transition"
              >
                ⬅ Back
              </button>

              <button
                onClick={handleBid}
                disabled={bidLoading}
                className={`w-full cursor-pointer md:w-auto px-6 py-3 rounded-lg font-medium text-white transition-all ${
                  bidLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 shadow-md hover:shadow-lg"
                }`}
              >
                {bidLoading ? (
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
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Processing Bid...
                  </span>
                ) : (
                  "Place Your Bid"
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetails;
