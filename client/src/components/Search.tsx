import { useState } from "react";
import useSearch from "../hooks/useSearch";
import SearchList from "./SearchList";

const Search = () => {
  const [word, setWord] = useState<string>("");
  const { searchList, isSearch } = useSearch(word);

  return (
    <>
      <div className="search fl">
        <div className="search_inputBox">
          <input
            type="text"
            placeholder="질환명을 입력해주세요."
            className="search_input"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setWord(event.target.value)
            }
          />
        </div>
        <div className="search_btnBox">
          <button className="search_btn fl">검색</button>
        </div>
      </div>
      {isSearch ? <SearchList searchList={searchList} /> : null}
    </>
  );
};

export default Search;
