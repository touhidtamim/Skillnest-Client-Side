const SortDropdown = ({ sortBy, setSortBy }) => {
  return (
    <select
      value={sortBy}
      onChange={(e) => setSortBy(e.target.value)}
      className="w-full md:w-48 px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
    >
      <option value="">Sort By</option>
      <option value="rating_desc">Best Rated</option>
      <option value="experience_desc">Most Experienced</option>
      <option value="rate_asc">Lowest Rate</option>
      <option value="rate_desc">Highest Rate</option>
    </select>
  );
};

export default SortDropdown;
