const SearchBar = ({ models, setFilteredModels }) => {
    const handleSearch = (event) => {
      const query = event.target.value.toLowerCase();
      setFilteredModels(
        models.filter((model) => model.name.toLowerCase().includes(query))
      );
    };
  
    return (
      <div className="mb-4">
        <input
          type="text"
          onChange={handleSearch}
          placeholder="Search models..."
          className="w-full p-3 rounded-lg bg-gray-700 text-white outline-none"
        />
      </div>
    );
  };
  
  export default SearchBar;  