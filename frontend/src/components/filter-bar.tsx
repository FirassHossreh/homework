type FilterBarProps = {
  filters: {
    minPrice: string;
    maxPrice: string;
    minPopularity: string;
    maxPopularity: string;
  };
  onFilterChange: (key: string, value: string) => void;
  onApply: () => void;
  onClear: () => void;
};

export default function FilterBar({
  filters,
  onFilterChange,
  onApply,
  onClear,
}: FilterBarProps) {
  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <input
          type="number"
          placeholder="Min Fiyat (USD)"
          value={filters.minPrice}
          onChange={e => onFilterChange("minPrice", e.target.value)}
          className="border rounded-lg p-2 text-sm w-full"
        />
        <input
          type="number"
          placeholder="Max Fiyat (USD)"
          value={filters.maxPrice}
          onChange={e => onFilterChange("maxPrice", e.target.value)}
          className="border rounded-lg p-2 text-sm w-full"
        />
        <input
          type="number"
          placeholder="Min Popülerlik (0-1)"
          step="0.01"
          value={filters.minPopularity}
          onChange={e => onFilterChange("minPopularity", e.target.value)}
          className="border rounded-lg p-2 text-sm w-full"
        />
        <input
          type="number"
          placeholder="Max Popülerlik (0-1)"
          step="0.01"
          value={filters.maxPopularity}
          onChange={e => onFilterChange("maxPopularity", e.target.value)}
          className="border rounded-lg p-2 text-sm w-full"
        />
      </div>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={onApply}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Filtrele
        </button>
        <button
          onClick={onClear}
          className="bg-gray-300 text-gray-800 px-6 py-2 rounded-lg hover:bg-gray-400 transition"
        >
          Temizle
        </button>
      </div>
    </>
  );
}
