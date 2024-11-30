function Search({ handleSubmit, query, setQuery }) {
  return (
    <form onSubmit={handleSubmit} className="flex justify-center">
      <input
        placeholder="Search stock..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="rounded-full px-4 py-2 text-sm 
            bg-gray-200 placeholder:text-gray-400 justify-center
            w-28 sm:w-64 sm:focus:w-72 transition-all focus:outline-none 
            focus:ring focus:bg-gray-300 focus:ring-opacity-50 text-stone-800"
      />
    </form>
  );
}

export default Search;
