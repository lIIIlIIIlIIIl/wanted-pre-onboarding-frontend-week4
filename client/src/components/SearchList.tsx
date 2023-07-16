import { SickName } from "../context/APIContext";

interface SearchListProps {
  searchList: SickName;
}

const SearchList = ({ searchList }: SearchListProps) => {
  return (
    <div className="searchList">
      <ul>
        {searchList.length > 0 ? (
          <>
            <p>추천 검색어</p>
            {searchList.map((item) => (
              <li key={item}>{item}</li>
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
