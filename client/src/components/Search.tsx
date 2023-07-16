import { useState } from "react";
import useSearch from "../hooks/useSearch";

const Search = () => {
  const { changeWord, searchList, word, isSearch } = useSearch();
  console.log(searchList);

  return (
    <div className="search fl">
      <div className="search_inputBox">
        <input
          type="text"
          placeholder="질환명을 입력해주세요."
          className="search_input"
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            changeWord(event)
          }
        />
      </div>
      <div className="search_btnBox">
        <button className="search_btn fl">검색</button>
      </div>
    </div>
  );
};

export default Search;
