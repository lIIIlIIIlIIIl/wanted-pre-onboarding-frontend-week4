/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from "react";
import { SickName } from "../context/APIContext";

interface SearchListProps {
  searchList: SickName;
  selectedIndex: number;
}

const SearchList = ({ searchList, selectedIndex }: SearchListProps) => {
  const listRef = useRef<HTMLUListElement>(null);

  const scrollToSelectedItem = () => {
    if (listRef.current && selectedIndex >= 0) {
      const selectedElement = listRef.current.childNodes[
        selectedIndex
      ] as HTMLElement;
      if (selectedElement) {
        selectedElement.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    }
  };

  useEffect(() => {
    scrollToSelectedItem();
  }, [selectedIndex]);

  return (
    <div className="searchList">
      <ul ref={listRef}>
        {searchList.length > 0 ? (
          <>
            <p>추천 검색어</p>
            {searchList.map((item, index) => (
              <li
                key={item}
                className={selectedIndex === index ? "highlighted" : ""}
              >
                <span className="searchItem">{item}</span>
              </li>
            ))}
          </>
        ) : (
          <div>검색 결과가 없습니다. 한글로 작성해주세요.</div>
        )}
      </ul>
    </div>
  );
};

export default SearchList;
