import { useState } from "react";
import useSearch from "../hooks/useSearch";
import SearchList from "./SearchList";

const Search = () => {
  const [keyword, setKeyword] = useState<string>("");
  const { searchList } = useSearch(keyword);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);
  const [autoSearchKeyword, setAutoSearchKeyword] = useState("");

  let isSelectVisible = false;
  if (keyword.length > 0) isSelectVisible = true;
  if (keyword.length < 0) isSelectVisible = false;

  const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.nativeEvent.isComposing) return;
    if (!event.nativeEvent.isComposing) {
      const key = event.key;

      if (key === "Enter") {
        alert(`${autoSearchKeyword} 검색 완료!`);
        setAutoSearchKeyword("");
        setSelectedIndex(-1);
        isSelectVisible = false;
        setKeyword("");
      }
      if (key === "ArrowDown" || key === "ArrowRight") {
        if (searchList.length === 0) return;
        if (selectedIndex + 1 === searchList.length) {
          setSelectedIndex(0);
          return;
        }
        setSelectedIndex((index) => index + 1);
        setAutoSearchKeyword(searchList[selectedIndex + 1]);
      }

      if (key === "ArrowUp" || key === "ArrowLeft") {
        if (selectedIndex === -1) {
          return;
        }
        if (selectedIndex === 0) {
          setAutoSearchKeyword("");
          setSelectedIndex((index) => index - 1);
          isSelectVisible = false;
          return;
        }

        setSelectedIndex((index) => index - 1);
        setAutoSearchKeyword(searchList[selectedIndex - 1]);
      }

      if (key === "Escape") {
        setAutoSearchKeyword("");
        setSelectedIndex(-1);
        isSelectVisible = false;
      }

      if (key === "Backspace") {
        if (!!autoSearchKeyword) {
          setAutoSearchKeyword("");
          setSelectedIndex(-1);
          isSelectVisible = false;
          setKeyword("");
        }
      }
    }
  };

  return (
    <>
      <div className="search fl">
        <div className="search_inputBox">
          <input
            type="text"
            placeholder="질환명을 입력해주세요."
            className="search_input"
            value={autoSearchKeyword ? autoSearchKeyword : keyword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              return setKeyword(event.target.value);
            }}
            onKeyDown={handleKeyUp}
          />
        </div>
        <div className="search_btnBox">
          <button className="search_btn fl">검색</button>
        </div>
      </div>
      {isSelectVisible ? (
        <SearchList searchList={searchList} selectedIndex={selectedIndex} />
      ) : null}
    </>
  );
};

export default Search;
