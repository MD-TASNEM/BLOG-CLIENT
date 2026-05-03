import { useState } from "react";

const SearchFilter = ({ 
  onSearch, 
  onFilter, 
  onSort, 
  categories, 
  emotionalTones, 
  accessLevels,
  showAccessFilter = true 
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedTone, setSelectedTone] = useState("all");
  const [selectedAccess, setSelectedAccess] = useState("all");
  const [sortBy, setSortBy] = useState("recent");
  const [isExpanded, setIsExpanded] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch?.(value);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    onFilter?.({ category, tone: selectedTone, access: selectedAccess });
  };

  const handleToneChange = (tone) => {
    setSelectedTone(tone);
    onFilter?.({ category: selectedCategory, tone, access: selectedAccess });
  };

  const handleAccessChange = (access) => {
    setSelectedAccess(access);
    onFilter?.({ category: selectedCategory, tone: selectedTone, access });
  };

  const handleSortChange = (sort) => {
    setSortBy(sort);
    onSort?.(sort);
  };

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedCategory("all");
    setSelectedTone("all");
    setSelectedAccess("all");
    setSortBy("recent");
    onSearch?.("");
    onFilter?.({ category: "all", tone: "all", access: "all" });
    onSort?.("recent");
  };

  const hasActiveFilters = searchTerm || selectedCategory !== "all" || 
                          selectedTone !== "all" || selectedAccess !== "all";

  return (
    <div className="card mb-6">
      {/* Search Bar */}
      <div className="mb-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search lessons by title, description, or creator..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-4 py-3 pl-12 bg-navy-light border border-navy rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-gold"
          />
          <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
            🔍
          </div>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                onSearch?.("");
              }}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-gold hover:text-gold-dark transition-colors"
        >
          <span>{isExpanded ? "Hide" : "Show"} Filters</span>
          <span className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}>
            ▼
          </span>
        </button>
        
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-gray-400 hover:text-white transition-colors text-sm"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="space-y-4 pb-4 border-b border-navy-light">
          {/* Category Filter */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Category</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleCategoryChange("all")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  selectedCategory === "all"
                    ? "bg-gold text-navy-dark"
                    : "bg-navy-light text-gray-300 hover:text-white"
                }`}
              >
                All Categories
              </button>
              {categories?.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedCategory === category
                      ? "bg-gold text-navy-dark"
                      : "bg-navy-light text-gray-300 hover:text-white"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Emotional Tone Filter */}
          <div>
            <label className="block text-gray-300 text-sm mb-2">Emotional Tone</label>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => handleToneChange("all")}
                className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                  selectedTone === "all"
                    ? "bg-gold text-navy-dark"
                    : "bg-navy-light text-gray-300 hover:text-white"
                }`}
              >
                All Tones
              </button>
              {emotionalTones?.map((tone) => (
                <button
                  key={tone}
                  onClick={() => handleToneChange(tone)}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedTone === tone
                      ? "bg-gold text-navy-dark"
                      : "bg-navy-light text-gray-300 hover:text-white"
                  }`}
                >
                  {tone}
                </button>
              ))}
            </div>
          </div>

          {/* Access Level Filter */}
          {showAccessFilter && (
            <div>
              <label className="block text-gray-300 text-sm mb-2">Access Level</label>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => handleAccessChange("all")}
                  className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                    selectedAccess === "all"
                      ? "bg-gold text-navy-dark"
                      : "bg-navy-light text-gray-300 hover:text-white"
                  }`}
                >
                  All Levels
                </button>
                {accessLevels?.map((access) => (
                  <button
                    key={access.value}
                    onClick={() => handleAccessChange(access.value)}
                    className={`px-3 py-1 rounded-lg text-sm font-medium transition-all ${
                      selectedAccess === access.value
                        ? "bg-gold text-navy-dark"
                        : "bg-navy-light text-gray-300 hover:text-white"
                    }`}
                  >
                    {access.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Sort Options */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <label className="text-gray-300 text-sm">Sort by:</label>
          <select
            value={sortBy}
            onChange={(e) => handleSortChange(e.target.value)}
            className="px-3 py-1 bg-navy-light border border-navy rounded-lg text-white text-sm focus:outline-none focus:border-gold"
          >
            <option value="recent">Most Recent</option>
            <option value="oldest">Oldest First</option>
            <option value="popular">Most Popular</option>
            <option value="likes">Most Liked</option>
            <option value="views">Most Viewed</option>
            <option value="favorites">Most Saved</option>
            <option value="title">Title A-Z</option>
          </select>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="flex items-center gap-2">
            <span className="text-gray-400 text-sm">Active filters:</span>
            {searchTerm && (
              <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs">
                Search: "{searchTerm}"
              </span>
            )}
            {selectedCategory !== "all" && (
              <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs">
                {selectedCategory}
              </span>
            )}
            {selectedTone !== "all" && (
              <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs">
                {selectedTone}
              </span>
            )}
            {selectedAccess !== "all" && (
              <span className="px-2 py-1 bg-gold/20 text-gold rounded-full text-xs">
                {selectedAccess}
              </span>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchFilter;
