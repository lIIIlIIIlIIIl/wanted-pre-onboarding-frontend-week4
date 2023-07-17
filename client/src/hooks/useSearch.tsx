/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { SickName, useApi } from "../context/APIContext";

const useSearch = (word: string) => {
  const [searchList, setSearchList] = useState<SickName>([]);

  const API = useApi();

  const getSearchData = async (word: string) => {
    const response = await API?.getSearch(word);
    if (response) setSearchList(response.sickName);
    console.info("calling api");
  };

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      getSearchData(word);
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
