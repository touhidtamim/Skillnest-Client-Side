import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const FindJobs = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("deadline_asc");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 20;

  const knownCategories = [
    "web development",
    "graphic design",
    "video editing",
    "content writing",
    "digital marketing",
  ];

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then((res) => res.json())
      .then((data) => {
        setTasks(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  // Filter out expired jobs and apply search/filters
  const filteredTasks = tasks
    .filter((task) => {
      // Hide expired jobs
      const isExpired = new Date(task.deadline) < new Date();
      if (isExpired) return false;

      // Search filter
      const term = search.toLowerCase();
      const matchesSearch =
        !term ||
        task.title?.toLowerCase().includes(term) ||
        task.description?.toLowerCase().includes(term) ||
        task.category?.toLowerCase().includes(term);

      // Category filter
      const taskCategory = task.category?.toLowerCase();
      const matchesCategory =
        category === ""
          ? true
          : category === "others"
          ? !knownCategories.includes(taskCategory)
          : taskCategory === category;

      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "budget_asc") return a.budget - b.budget;
      if (sortBy === "budget_desc") return b.budget - a.budget;
      if (sortBy === "deadline_asc")
        return new Date(a.deadline) - new Date(b.deadline);
      if (sortBy === "deadline_desc")
        return new Date(b.deadline) - new Date(a.deadline);
      return 0;
    });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredTasks.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredTasks.length / jobsPerPage);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const getDaysRemaining = (deadline) => {
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const Pagination = () => {
    if (totalPages <= 1) return null;

    return (
      <div className="flex justify-center mt-6 space-x-2">
        {currentPage > 1 && (
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            className="px-3 py-1 rounded bg-gray-200"
          >
            Previous
          </button>
        )}

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded ${
                currentPage === pageNum
                  ? "bg-teal-600 text-white"
                  : "bg-gray-200"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {currentPage < totalPages && (
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            className="px-3 py-1 rounded bg-gray-200"
          >
            Next
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4">
      <div className="text-center py-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Available Jobs
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Browse all active jobs with their deadlines. Expired jobs are hidden.
        </p>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="col-span-1 md:col-span-2">
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1); // Reset to first page on search
              }}
              placeholder="Search by title, description or category"
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring focus:ring-teal-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <select
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
                setCurrentPage(1); // Reset to first page on filter change
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
            >
              <option value="">All Categories</option>
              {knownCategories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </option>
              ))}
              <option value="others">Others</option>
            </select>
            <select
              value={sortBy}
              onChange={(e) => {
                setSortBy(e.target.value);
                setCurrentPage(1); // Reset to first page on sort change
              }}
              className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
            >
              <option value="deadline_asc">Deadline: Soonest First</option>
              <option value="deadline_desc">Deadline: Latest First</option>
              <option value="budget_asc">Budget: Low to High</option>
              <option value="budget_desc">Budget: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-dashed border-teal-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Job Title
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Budget
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Deadline
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Days Left
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {currentJobs.length > 0 ? (
                    currentJobs.map((task) => {
                      const daysLeft = getDaysRemaining(task.deadline);
                      return (
                        <tr key={task._id} className="hover:bg-gray-50">
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm font-medium text-gray-900">
                              {task.title}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500 capitalize">
                              {task.category}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-900">
                              ${task.budget}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="text-sm text-gray-500">
                              {formatDate(task.deadline)}
                            </div>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span
                              className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                              ${
                                daysLeft <= 3
                                  ? "bg-red-100 text-red-800"
                                  : daysLeft <= 7
                                  ? "bg-yellow-100 text-yellow-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {daysLeft} days
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                            <Link
                              to={`/task/${task._id}`}
                              className="text-teal-600 hover:text-teal-900"
                            >
                              View Details
                            </Link>
                          </td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-4 text-center text-sm text-gray-500"
                      >
                        No active jobs found matching your criteria
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Pagination */}
          <Pagination />

          {/* Job count info */}
          <div className="text-center text-sm text-gray-500 mt-2">
            Showing {currentJobs.length} of {filteredTasks.length} active jobs
          </div>
        </>
      )}
    </div>
  );
};

export default FindJobs;
