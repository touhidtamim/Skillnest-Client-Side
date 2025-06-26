import SearchBar from "./SearchBar";
import SortDropdown from "./SortDropdown";
import FilterBySkill from "./FilterBySkill";

const SearchAndFilterBar = ({
  search,
  setSearch,
  sortBy,
  setSortBy,
  selectedSkill,
  setSelectedSkill,
}) => {
  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Search bar stays full width always */}
      <div className="w-full">
        <SearchBar search={search} setSearch={setSearch} />
      </div>

      {/* Sort and Filter side-by-side on md+ */}
      <div className="flex flex-col md:flex-row md:gap-4 lg:flex-col w-full">
        <div className="w-full md:w-1/2">
          <SortDropdown sortBy={sortBy} setSortBy={setSortBy} />
        </div>
        <div className="w-full md:w-1/2">
          <FilterBySkill
            selectedSkill={selectedSkill}
            setSelectedSkill={setSelectedSkill}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilterBar;
