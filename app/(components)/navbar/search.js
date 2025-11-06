export const Search = () => {
  return (
    <form className="hidden w-full max-w-xs">
      <div className="flex items-center gap-2 bg-gray-100 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 ring-blue-400">
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent flex-1 outline-none text-sm"
        />
        <button type="submit" className="text-gray-500 hover:text-blue-600">
          🔍
        </button>
      </div>
    </form>
  );
};
