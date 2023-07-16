import { SickName } from "../context/APIContext";

interface SearchListProps {
  searchList: SickName;
}

const SearchList = ({ searchList }: SearchListProps) => {
  return (
    <div>
      <ul>
        {searchList.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchList;
