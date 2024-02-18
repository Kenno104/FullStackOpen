const Search = ({ search, handleSearch }) => {
    return (
      <p>Filter shown with: <input
                                value={search}
                                onChange={handleSearch}
                              />
        </p>
    )
  }

export default Search