import React from "react";

interface FilterBarProps {
  search: string;
  setSearch: (v: string) => void;
  status: string | undefined;
  setStatus: (v: string | undefined) => void;
  category: string | undefined;
  setCategory: (v: string | undefined) => void;
  consoleFilter: string | undefined;
  setConsoleFilter: (v: string | undefined) => void;
  categories: string[];
  consoles: string[];
}

const FilterBar: React.FC<FilterBarProps> = ({
  search,
  setSearch,
  status,
  setStatus,
  category,
  setCategory,
  consoleFilter,
  setConsoleFilter,
  categories,
  consoles,
}) => {
  return (
    <div className="flex flex-wrap gap-2 items-end mb-2 p-2 bg-white/60 dark:bg-gray-800 rounded-lg shadow mb-4">
      <input
        type="text"
        placeholder="Search games..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-xs bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:outline-none"
      />
      <select
        value={status || ""}
        onChange={e => setStatus(e.target.value || undefined)}
        className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-xs bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:outline-none"
      >
        <option value="">All Statuses</option>
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <select
        value={consoleFilter || ""}
        onChange={e => setConsoleFilter(e.target.value || undefined)}
        className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-xs bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:outline-none"
      >
        <option value="">All Consoles</option>
        {consoles.map(c => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        value={category || ""}
        onChange={e => setCategory(e.target.value || undefined)}
        className="px-2 py-1 rounded border border-gray-300 dark:border-gray-600 text-xs bg-gray-50 dark:bg-gray-900 dark:text-gray-100 focus:outline-none"
      >
        <option value="">All Categories</option>
        {categories.map(cat => (
          <option key={cat} value={cat}>{cat}</option>
        ))}
      </select>
    </div>
  );
};

export default FilterBar;
