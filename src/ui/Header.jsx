import Search from "./Search";

function Header({handleSubmit, query, setQuery}) {
  return (
    <div >
      <header
        className="flex items-center justify-around 
        bg-gray-800 text-white py-4 uppercase width-full"
      >
        Stock Pitch Generator
      <Search handleSubmit={handleSubmit} query={query} setQuery={setQuery} />
      </header>
    </div>
  );
}

export default Header;
