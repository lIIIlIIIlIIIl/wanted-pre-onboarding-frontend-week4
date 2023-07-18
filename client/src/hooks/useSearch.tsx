/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { SickName, useApi } from "../context/APIContext";
import getSearchKeywordWithCach from "../utils/getSearchKeywordWithCach";

export type CacheData = {
  [key: string]: {
    data: string[];
    expiration: number;
  };
};

const useSearch = (word: string) => {
  const [searchList, setSearchList] = useState<SickName>([]);

  const API = useApi();

  const handleSearchData = async () => {
    const data = await getSearchKeywordWithCach(word, API);
    if (data) setSearchList(data);
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      if (word.length > 0) {
      }
      handleSearchData();
    }, 500);
    return () => {
      clearTimeout(delayTimer);
      setSearchList([]);
    };
  }, [word]);

  return {
    searchList,
  };
};

export default useSearch;
