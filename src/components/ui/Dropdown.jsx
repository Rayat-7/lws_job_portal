import React from 'react';

const Dropdown = ({
  dropdownName,
  options,
  dropdownId,
  openDropdown,
  toggleDropdown,
  toggleFilter,
  filters,
  category,
}) => {
  return (
    <div className="dropdown">
      <button
        className="btn btn-outline text-xs h-8 px-3 flex items-center"
        onClick={() => toggleDropdown(dropdownId)}
      >
        {dropdownName}
        {filters[category]?.length ? ` (${filters[category].length})` : ''}
        <i data-lucide="chevron-down" className="ml-2 h-3 w-3"></i>
      </button>

      <div
        id={dropdownId}
        className={`dropdown-content card p-2 ${
          openDropdown === dropdownId ? 'show' : ''
        }`}
      >
        <div className="space-y-1">
          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 p-2 hover:bg-accent rounded cursor-pointer"
            >
              <input
                type="checkbox"
                className="rounded border-input"
                checked={filters[category]?.includes(option)}
                onChange={() => toggleFilter(category, option)}
              />
              <span className="text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;