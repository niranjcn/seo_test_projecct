import React from "react";

const Filters = ({ filters, setFilters, applyFilters }) => {
  return (
    <div className="bg-white p-4 rounded shadow mb-6 flex flex-col md:flex-row gap-4">
      <select
        className="border p-2 rounded w-full md:w-1/4"
        value={filters.gender}
        onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
      >
        <option value="">Select Gender</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </select>

      <select
        className="border p-2 rounded w-full md:w-1/4"
        value={filters.availability}
        onChange={(e) => setFilters({ ...filters, availability: e.target.value })}
      >
        <option value="">Availability</option>
        <option value="today">Today</option>
        <option value="tomorrow">Tomorrow</option>
      </select>

      <input
        type="number"
        placeholder="Min Fees"
        className="border p-2 rounded w-full md:w-1/4"
        value={filters.minFees}
        onChange={(e) => setFilters({ ...filters, minFees: e.target.value })}
      />

      <input
        type="number"
        placeholder="Max Fees"
        className="border p-2 rounded w-full md:w-1/4"
        value={filters.maxFees}
        onChange={(e) => setFilters({ ...filters, maxFees: e.target.value })}
      />

      <button
        className="bg-blue-600 text-white p-2 rounded w-full md:w-auto"
        onClick={applyFilters}
      >
        Apply Filters
      </button>
    </div>
  );
};

export default Filters;
