/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useEffect, useState } from "react";

import { SickName, useApi } from "../context/APIContext";

const useSearch = () => {
  const [word, setWord] = useState<string>("");
  const [searchList, setSearchList] = useState<SickName>([]);
  const API = useApi();

  let isSearch = false;

  const getSearchData = useCallback(async () => {
    const response = await API?.getSearch(word);
    if (response) setSearchList(response.sickName);
  }, [API, word]);

  const changeWord = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setWord(event.target.value);
    },
    []
  );

  useEffect(() => {
    if (word.length > 0) {
      isSearch = true;
      getSearchData();
    }
    if (word.length === 0) {
      isSearch = false;
    }
    return () => {
      setWord("");
      setSearchList([]);
    };
  }, [word]);

  return { changeWord, searchList, word, isSearch };
};

export default useSearch;
