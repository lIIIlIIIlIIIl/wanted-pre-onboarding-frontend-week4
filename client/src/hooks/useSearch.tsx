/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { SickName, useApi } from "../context/APIContext";

const useSearch = (word: string) => {
  const [searchList, setSearchList] = useState<SickName>([]);

  const API = useApi();

  const getSearchData = async (word: string) => {
    const response = await API?.getSearch(word);
    if (response) setSearchList(response.sickName);
  };

  useEffect(() => {
    if (word.length > 0) {
      getSearchData(word);
    }
    if (word.length === 0) {
    }
    return () => {
      setSearchList([]);
    };
  }, [word]);

  return {
    searchList,
  };
};

export default useSearch;
