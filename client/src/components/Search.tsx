const Search = () => {
  return (
    <div className="search fl">
      <div className="search_inputBox">
        <input
          type="text"
          placeholder="질환명을 입력해주세요."
          className="search_input"
        />
      </div>
      <div className="search_btnBox">
        <button className="search_btn fl">검색</button>
      </div>
    </div>
  );
};

export default Search;
