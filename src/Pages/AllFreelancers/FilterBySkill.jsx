const FilterBySkill = ({ selectedSkill, setSelectedSkill }) => {
  const skills = [
    "All",
    "Web Development",
    "Graphic Design",
    "SEO",
    "UI/UX",
    "Content Writing",
  ];

  return (
    <select
      value={selectedSkill}
      onChange={(e) => setSelectedSkill(e.target.value)}
      className="w-full md:w-52 px-4 py-2 border border-gray-300 rounded-xl shadow-sm"
    >
      {skills.map((skill, idx) => (
        <option key={idx} value={skill === "All" ? "" : skill}>
          {skill}
        </option>
      ))}
    </select>
  );
};

export default FilterBySkill;
