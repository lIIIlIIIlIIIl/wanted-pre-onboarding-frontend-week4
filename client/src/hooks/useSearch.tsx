/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";

import { SickName, useApi } from "../context/APIContext";

type CacheData = {
  [key: string]: {
    data: string[];
    expiration: number;
  };
};

const EXPIRATION_TIME = 1000 * 60;

const useSearch = (word: string) => {
  const [searchList, setSearchList] = useState<SickName>([]);
  const [cacheData, setCacheData] = useState<CacheData>({});

  const API = useApi();

  const getSearchData = (word: string) => {
    if (cacheData[word] && cacheData[word].expiration > Date.now()) {
      handleSearchData(cacheData[word].data);
    } else {
      return API?.getSearch(word)
        .then((data) => {
          if (data && data.sickName.length > 0) {
            const expiration = Date.now() + EXPIRATION_TIME;
            setCacheData((prev) => ({
              ...prev,
              [word]: {
                data: data.sickName,
                expiration,
              },
            }));
            console.info("calling api");
            setSearchList(data.sickName);
          }
        })
        .catch((error) => {
          console.error("API 호출 에러", error);
        });
    }
  };

  const handleSearchData = (data: string[]) => {
    setSearchList(data);
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
