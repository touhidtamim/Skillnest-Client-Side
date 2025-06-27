import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TaskCard from "./TaskCard";

// Pagination Component
const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages <= 1) return null;

  return (
    <div className="flex justify-center mt-6 space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-3 py-1 rounded ${
            currentPage === page ? "bg-teal-600 text-white" : "bg-gray-200"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const ExploreJobs = () => {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  const [urgentPage, setUrgentPage] = useState(1);
  const [highBudgetPage, setHighBudgetPage] = useState(1);
  const [allPage, setAllPage] = useState(1);

  const urgentPerPage = 4;
  const highBudgetPerPage = 4;
  const allPerPage = 24;

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
        setUrgentPage(1);
        setHighBudgetPage(1);
        setAllPage(1);
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setLoading(false);
      });
  }, []);

  const filteredTasks = tasks
    .filter((task) => {
      const term = search.toLowerCase();
      const matchesSearch =
        !term ||
        task.title?.toLowerCase().includes(term) ||
        task.description?.toLowerCase().includes(term) ||
        task.category?.toLowerCase().includes(term);

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

  const urgentTasks = filteredTasks.filter((t) => {
    const deadline = new Date(t.deadline);
    const today = new Date();
    if (isNaN(deadline)) return false;
    const diffInDays = (deadline - today) / (1000 * 60 * 60 * 24);
    return diffInDays <= 3;
  });

  const highBudgetTasks = filteredTasks.filter((t) => t.budget >= 1000);

  const paginatedUrgent = urgentTasks.slice(
    (urgentPage - 1) * urgentPerPage,
    urgentPage * urgentPerPage
  );
  const paginatedHighBudget = highBudgetTasks.slice(
    (highBudgetPage - 1) * highBudgetPerPage,
    highBudgetPage * highBudgetPerPage
  );
  const paginatedAll = filteredTasks.slice(
    (allPage - 1) * allPerPage,
    allPage * allPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="text-center py-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Find Your <span className="text-teal-600">Next Job</span>
        </h1>
        <p className="mt-2 text-gray-600 max-w-2xl mx-auto leading-relaxed">
          Discover tailored freelance projects and opportunities that match your
          skills. Find, bid, and grow your freelance career with ease.
        </p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-dashed border-teal-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
              <div className="my-8 text-center lg:text-left">
                <h1 className="text-3xl font-bold mb-2 text-gray-900">
                  Discover Your Ideal Project
                </h1>
                <p className="text-gray-600 max-w-xl mx-auto lg:mx-0">
                  Browse, filter, and find projects that match your skills and
                  passion.
                </p>
              </div>

              <h3 className="text-lg font-semibold mb-4">Search & Filters</h3>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by title or category"
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl shadow-sm focus:ring focus:ring-teal-200"
              />
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 mb-4 border border-gray-300 rounded-xl shadow-sm"
              >
                <option value="">Filter by Category</option>
                {knownCategories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </option>
                ))}
                <option value="others">Others</option>
              </select>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
              >
                <option value="">Sort By</option>
                <option value="budget_asc">Budget: Low to High</option>
                <option value="budget_desc">Budget: High to Low</option>
                <option value="deadline_asc">Deadline: Soonest First</option>
                <option value="deadline_desc">Deadline: Latest First</option>
              </select>
            </aside>

            {/* Main Right Side */}
            <main className="w-full lg:w-3/4 space-y-10">
              {/* Urgent Tasks */}
              <section className="w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  Urgent Tasks
                </h2>
                {paginatedUrgent.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {paginatedUrgent.map((task) => (
                        <TaskCard key={task._id} task={task} />
                      ))}
                    </div>
                    <Pagination
                      currentPage={urgentPage}
                      totalItems={urgentTasks.length}
                      itemsPerPage={urgentPerPage}
                      onPageChange={setUrgentPage}
                    />
                  </>
                ) : (
                  <p>No urgent tasks available.</p>
                )}
              </section>

              {/* High Budget Tasks */}
              <section className="w-full">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  High Budget Tasks
                </h2>
                {paginatedHighBudget.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {paginatedHighBudget.map((task) => (
                        <TaskCard key={task._id} task={task} />
                      ))}
                    </div>
                    <Pagination
                      currentPage={highBudgetPage}
                      totalItems={highBudgetTasks.length}
                      itemsPerPage={highBudgetPerPage}
                      onPageChange={setHighBudgetPage}
                    />
                  </>
                ) : (
                  <p>No high-budget tasks available.</p>
                )}
              </section>
            </main>
          </div>

          {/* All Jobs Section (Bottom Full Width) */}
          <section className="mt-16 bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
              All Jobs
            </h2>
            {paginatedAll.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {paginatedAll.map((task) => (
                    <TaskCard key={task._id} task={task} />
                  ))}
                </div>
                <Pagination
                  currentPage={allPage}
                  totalItems={filteredTasks.length}
                  itemsPerPage={allPerPage}
                  onPageChange={setAllPage}
                />
              </>
            ) : (
              <p>No jobs found.</p>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default ExploreJobs;
