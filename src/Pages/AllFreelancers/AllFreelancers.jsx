import { useEffect, useState } from "react";
import HeaderSection from "./HeaderSection";
import SearchAndFilterBar from "./SearchAndFilterBar";
import FreelancerCard from "./FreelancerCard.jsx";

const Pagination = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
}) => {
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  if (totalPages === 1) return null;

  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  return (
    <div className="flex justify-center mt-4 space-x-2">
      {pages.map((page) => (
        <button
          key={page}
          className={`px-3 py-1 rounded ${
            page === currentPage ? "bg-blue-600 text-white" : "bg-gray-200"
          }`}
          onClick={() => onPageChange(page)}
        >
          {page}
        </button>
      ))}
    </div>
  );
};

const AllFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");

  const [topRatedPage, setTopRatedPage] = useState(1);
  const [fourStarPage, setFourStarPage] = useState(1);
  const [allFreelancersPage, setAllFreelancersPage] = useState(1);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const topRatedPerPage = 4;
  const fourStarPerPage = 4;
  const allFreelancersPerPage = 24;

  useEffect(() => {
    const fetchFreelancers = async () => {
      setLoading(true);
      setError(null);

      try {
        let query = [];
        if (search) query.push(`search=${encodeURIComponent(search)}`);
        if (sortBy) query.push(`sortBy=${encodeURIComponent(sortBy)}`);
        if (selectedSkill)
          query.push(`skill=${encodeURIComponent(selectedSkill)}`);

        const queryString = query.length > 0 ? `?${query.join("&")}` : "";

        const res = await fetch(
          `http://localhost:5000/freelancers${queryString}`
        );

        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }

        const data = await res.json();
        setFreelancers(data);

        // Reset pagination on new data fetch
        setTopRatedPage(1);
        setFourStarPage(1);
        setAllFreelancersPage(1);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data.");
        setFreelancers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, [search, sortBy, selectedSkill]);

  const topRatedFreelancers = freelancers.filter((f) => f.rating === 5);
  const fourStarPlusFreelancers = freelancers.filter(
    (f) => f.rating >= 4 && f.rating < 5
  );

  const allFreelancersSorted = [...freelancers].sort(
    (a, b) => b.rating - a.rating
  );

  const paginatedTopRated = topRatedFreelancers.slice(
    (topRatedPage - 1) * topRatedPerPage,
    topRatedPage * topRatedPerPage
  );

  const paginatedFourStar = fourStarPlusFreelancers.slice(
    (fourStarPage - 1) * fourStarPerPage,
    fourStarPage * fourStarPerPage
  );

  const paginatedAllFreelancers = allFreelancersSorted.slice(
    (allFreelancersPage - 1) * allFreelancersPerPage,
    allFreelancersPage * allFreelancersPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4">
      <HeaderSection />

      {loading ? (
        <p className="text-center text-lg py-20">Loading freelancers...</p>
      ) : error ? (
        <p className="text-center text-red-600 py-20">Error: {error}</p>
      ) : (
        <>
          {/* Responsive layout */}
          <div className="flex flex-col lg:flex-row gap-6 mb-16">
            {/* Sidebar */}
            <aside className="w-full lg:w-1/4 bg-white p-6 rounded-lg shadow-md">
              <div className="my-8">
                <h1 className="text-3xl font-bold mb-2">
                  Find Your Perfect Freelancer
                </h1>
                <p className="text-gray-600">
                  Search, filter, and hire top freelancers for your projects.
                </p>
              </div>
              <SearchAndFilterBar
                search={search}
                setSearch={setSearch}
                sortBy={sortBy}
                setSortBy={setSortBy}
                selectedSkill={selectedSkill}
                setSelectedSkill={setSelectedSkill}
              />
            </aside>

            {/* Main content */}
            <main className="w-full lg:w-3/4 space-y-10">
              {/* Top Rated Section */}
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Top Rated Freelancers
                </h2>
                {topRatedFreelancers.length === 0 ? (
                  <p>No top rated freelancers found.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {paginatedTopRated.map((f) => (
                        <FreelancerCard key={f._id} freelancer={f} />
                      ))}
                    </div>
                    <Pagination
                      currentPage={topRatedPage}
                      totalItems={topRatedFreelancers.length}
                      itemsPerPage={topRatedPerPage}
                      onPageChange={setTopRatedPage}
                    />
                  </>
                )}
              </section>

              {/* 4 Stars Section */}
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Freelancers with 4 Stars and above
                </h2>
                {fourStarPlusFreelancers.length === 0 ? (
                  <p>No freelancers found with 4 stars and above.</p>
                ) : (
                  <>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {paginatedFourStar.map((f) => (
                        <FreelancerCard key={f._id} freelancer={f} />
                      ))}
                    </div>
                    <Pagination
                      currentPage={fourStarPage}
                      totalItems={fourStarPlusFreelancers.length}
                      itemsPerPage={fourStarPerPage}
                      onPageChange={setFourStarPage}
                    />
                  </>
                )}
              </section>
            </main>
          </div>

          {/* All Freelancers Section */}
          <section className="mb-16 bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-semibold mb-4">All Freelancers</h2>
            {allFreelancersSorted.length === 0 ? (
              <p>No freelancers found.</p>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6">
                  {paginatedAllFreelancers.map((f) => (
                    <FreelancerCard key={f._id} freelancer={f} />
                  ))}
                </div>
                <Pagination
                  currentPage={allFreelancersPage}
                  totalItems={allFreelancersSorted.length}
                  itemsPerPage={allFreelancersPerPage}
                  onPageChange={setAllFreelancersPage}
                />
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default AllFreelancers;
