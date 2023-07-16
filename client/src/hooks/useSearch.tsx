/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";

import { SickName, useApi } from "../context/APIContext";

const useSearch = (word: string) => {
  const [searchList, setSearchList] = useState<SickName>([]);
  const [isSearch, setIsSearch] = useState<boolean>(false);
  const API = useApi();

  const getSearchData = useCallback(
    async (word: string) => {
      const response = await API?.getSearch(word);
      if (response) setSearchList(response.sickName);
    },
    [API]
  );

  useEffect(() => {
    if (word.length > 0) {
      setIsSearch(true);
      getSearchData(word);
    }
    if (word.length === 0) {
      setIsSearch(false);
    }
    return () => {
      setSearchList([]);
    };
  }, [word]);

  return { searchList, isSearch };
};

export default useSearch;
