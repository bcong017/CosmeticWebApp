import "../css/SearchBar.css";

function SearchBar () {
    return (
        <div className="input-wrapper">
          <i className="fa-solid fa-magnifying-glass icon"></i>
          <input type="text" placeholder="Tìm kiếm" />
          <button>Tìm kiếm</button>
        </div>
      );
}
export default SearchBar;