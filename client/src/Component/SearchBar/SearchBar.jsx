import './SearchBar.css';

function SearchBar() {
  return (
    <div className='input-wrapper'>
      <i className='fa-solid fa-magnifying-glass icon'></i>
      <input
        type='text'
        placeholder='Tìm kiếm'
        className='bg-transparent mx-2 text-lg focus:outline-none'
      />
      <button>Tìm kiếm</button>
    </div>
  );
}

export default SearchBar;
