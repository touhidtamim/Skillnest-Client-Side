import { useEffect, useState } from "react";
import HeaderSection from "./HeaderSection";
import FreelancerCard from "./FreelancerCard.jsx";

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

const AllFreelancers = () => {
  const [freelancers, setFreelancers] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedSkill, setSelectedSkill] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [loading, setLoading] = useState(true);

  const [topRatedPage, setTopRatedPage] = useState(1);
  const [fourStarPage, setFourStarPage] = useState(1);
  const [allPage, setAllPage] = useState(1);

  const topRatedPerPage = 4;
  const fourStarPerPage = 4;
  const allPerPage = 24;

  const knownSkills = [
    "video editing",
    "graphic design",
    "web development",
    "content writing",
    "digital marketing",
  ];

  useEffect(() => {
    const fetchFreelancers = async () => {
      setLoading(true);
      try {
        const res = await fetch("http://localhost:5000/freelancers");
        if (!res.ok) throw new Error(`Error ${res.status}: ${res.statusText}`);
        const data = await res.json();

        // Normalize data: ensure all required fields exist and are lowercase where needed
        const normalizedData = data.map((f) => ({
          ...f,
          name: f.name || "",
          specialty: f.specialty || "",
          skills: Array.isArray(f.skills)
            ? f.skills.map((s) => (s ? s.toString().toLowerCase() : ""))
            : [],
          rating: typeof f.rating === "number" ? f.rating : 0,
          experience: typeof f.experience === "number" ? f.experience : 0,
          rate: typeof f.rate === "number" ? f.rate : 0,
          rank: f.rank || "",
          description: f.description || "",
          _id: f._id || Math.random().toString(36).substr(2, 9), // fallback id if none
        }));

        setFreelancers(normalizedData);
      } catch (err) {
        console.error("Fetch error:", err);
        setFreelancers([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFreelancers();
  }, []);

  // Filter, search and skill logic with safety checks
  const filteredFreelancers = freelancers
    .filter((freelancer) => {
      const term = (search || "").toLowerCase().trim();
      const name = (freelancer.name || "").toLowerCase();
      const specialty = (freelancer.specialty || "").toLowerCase();
      const rank = (freelancer.rank || "").toLowerCase();
      const description = (freelancer.description || "").toLowerCase();
      const skills = Array.isArray(freelancer.skills) ? freelancer.skills : [];

      const matchesSearch =
        term === "" ||
        name.includes(term) ||
        specialty.includes(term) ||
        rank.includes(term) ||
        description.includes(term) ||
        skills.some((skill) => (skill || "").toLowerCase().includes(term));

      let matchesSkill = true;
      if (selectedSkill) {
        if (selectedSkill === "others") {
          matchesSkill = !knownSkills.some((knownSkill) =>
            skills.includes(knownSkill.toLowerCase())
          );
        } else {
          matchesSkill = skills.includes(selectedSkill.toLowerCase());
        }
      }

      return matchesSearch && matchesSkill;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "rating_desc":
          return b.rating - a.rating;
        case "experience_desc":
          return b.experience - a.experience;
        case "rate_asc":
          return a.rate - b.rate;
        case "rate_desc":
          return b.rate - a.rate;
        default:
          return 0;
      }
    });

  const topRatedFreelancers = filteredFreelancers.filter(
    (f) => f.rating >= 4.5
  );
  const fourStarFreelancers = filteredFreelancers.filter(
    (f) => f.rating >= 4 && f.rating < 4.5
  );

  const paginatedTopRated = topRatedFreelancers.slice(
    (topRatedPage - 1) * topRatedPerPage,
    topRatedPage * topRatedPerPage
  );

  const paginatedFourStar = fourStarFreelancers.slice(
    (fourStarPage - 1) * fourStarPerPage,
    fourStarPage * fourStarPerPage
  );

  const paginatedAll = filteredFreelancers.slice(
    (allPage - 1) * allPerPage,
    allPage * allPerPage
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <HeaderSection />

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="w-12 h-12 border-4 border-dashed border-teal-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <>
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

              <div className="flex flex-col gap-6 w-full">
                {/* Search */}
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or skills..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm focus:ring focus:ring-teal-200"
                />

                {/* Filter by Skill */}
                <select
                  value={selectedSkill}
                  onChange={(e) => setSelectedSkill(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
                >
                  <option value="">Filter by Skill</option>
                  {knownSkills.map((skill) => (
                    <option key={skill} value={skill.toLowerCase()}>
                      {skill.charAt(0).toUpperCase() + skill.slice(1)}
                    </option>
                  ))}
                  <option value="others">Others</option>
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
                >
                  <option value="">Sort By</option>
                  <option value="rating_desc">Best Rated</option>
                  <option value="experience_desc">Most Experienced</option>
                  <option value="rate_asc">Lowest Rate</option>
                  <option value="rate_desc">Highest Rate</option>
                </select>
              </div>
            </aside>

            {/* Main Content */}
            <main className="w-full lg:w-3/4 space-y-10">
              {/* Top Rated Section */}
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Top Rated Freelancers (4.5+ Stars)
                </h2>
                {paginatedTopRated.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
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
                ) : (
                  <p className="text-gray-500">
                    {search || selectedSkill
                      ? "No top rated freelancers match your criteria"
                      : "No top rated freelancers available"}
                  </p>
                )}
              </section>

              {/* 4 Stars Section */}
              <section className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-4">
                  Freelancers with 4 Stars and above
                </h2>
                {paginatedFourStar.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {paginatedFourStar.map((f) => (
                        <FreelancerCard key={f._id} freelancer={f} />
                      ))}
                    </div>
                    <Pagination
                      currentPage={fourStarPage}
                      totalItems={fourStarFreelancers.length}
                      itemsPerPage={fourStarPerPage}
                      onPageChange={setFourStarPage}
                    />
                  </>
                ) : (
                  <p className="text-gray-500">
                    {search || selectedSkill
                      ? "No 4-star freelancers match your criteria"
                      : "No 4-star freelancers available"}
                  </p>
                )}
              </section>
            </main>
          </div>

          {/* All Freelancers Section */}
          <section className="mt-16 bg-white p-6 rounded-lg shadow-md w-full">
            <h2 className="text-2xl font-semibold mb-4">All Freelancers</h2>
            {paginatedAll.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
                  {paginatedAll.map((f) => (
                    <FreelancerCard key={f._id} freelancer={f} />
                  ))}
                </div>
                <Pagination
                  currentPage={allPage}
                  totalItems={filteredFreelancers.length}
                  itemsPerPage={allPerPage}
                  onPageChange={setAllPage}
                />
              </>
            ) : (
              <div className="text-center py-10">
                <p className="text-lg text-gray-600">
                  {search || selectedSkill
                    ? "No freelancers match your search criteria."
                    : "No freelancers available at the moment."}
                </p>
                {(search || selectedSkill) && (
                  <button
                    onClick={() => {
                      setSearch("");
                      setSelectedSkill("");
                    }}
                    className="mt-4 px-4 py-2 bg-teal-600 text-white rounded hover:bg-teal-700"
                  >
                    Clear filters
                  </button>
                )}
              </div>
            )}
          </section>
        </>
      )}
    </div>
  );
};

export default AllFreelancers;
