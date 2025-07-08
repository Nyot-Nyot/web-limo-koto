"use client";

import { FaSearch, FaFilter } from "react-icons/fa";

interface SearchFilterProps {
  searchTerm: string;
  sortBy: string;
  onSearchChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onSearch: () => void;
}

export default function SearchFilter({
  searchTerm,
  sortBy,
  onSearchChange,
  onSortChange,
  onSearch
}: SearchFilterProps) {
  return (
    <div className="mb-8 md:mb-10">
      <div className="max-w-3xl mx-auto px-2 md:px-0">
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-3 md:p-4 border border-white/20 shadow-lg">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="h-4 w-4 text-blue-300" />
              </div>
              <input
                type="text"
                placeholder="Cari berita..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="block w-full pl-10 pr-4 py-2.5 text-sm bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg text-white placeholder-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent transition-all duration-300 shadow-md hover:bg-white/25"
              />
            </div>
            
            {/* Sort and Filter */}
            <div className="flex gap-2">
              <div className="relative">
                <select 
                  value={sortBy}
                  onChange={(e) => onSortChange(e.target.value)}
                  className="appearance-none bg-white/20 backdrop-blur-sm border border-white/30 rounded-lg px-4 py-2.5 pr-8 text-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 cursor-pointer shadow-md hover:bg-white/25 transition-all duration-300"
                >
                  <option value="latest" className="bg-gray-800 text-white">Terbaru</option>
                  <option value="popular" className="bg-gray-800 text-white">Terpopuler</option>
                  <option value="oldest" className="bg-gray-800 text-white">Terlama</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <FaFilter className="h-3 w-3 text-blue-300" />
                </div>
              </div>
              
              <button 
                onClick={onSearch}
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-4 py-2.5 rounded-lg font-medium transition-all duration-300 shadow-md hover:shadow-lg text-sm"
              >
                Cari
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
