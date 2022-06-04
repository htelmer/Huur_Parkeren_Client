import { FaSearch } from "react-icons/fa";
import { useState } from "react";

const SearchBar = (props) => {
  // const setSearchTerm = props.setSearchTerm;
  const [filter, setFilter] = useState("");

  const updateFilter = (e) => {
    console.log(filter);
    setFilter(e.target.value);
  };

  return (
    <div>
      <div className="SearchBar">
        <form>
          <input
            type="text"
            id="header-search"
            placeholder="Search.."
            className="input-field"
            value={filter}
            onChange={updateFilter}
          />
          <button type="submit" className="searchbtn">
            <FaSearch />
          </button>
        </form>
      </div>
    </div>
  );
};

export { SearchBar };
