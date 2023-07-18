import { SearchSerivceType } from "../context/APIContext";
import { CacheData } from "../hooks/useSearch";

const getSearchKeywordWithCach = (function () {
  const cache: CacheData = {};
  const EXPIRATION_TIME = 1000 * 60;

  const searchKeyword = (keyword: string, API: SearchSerivceType | null) => {
    if (cache[keyword] && cache[keyword].expiration > Date.now()) {
      return cache[keyword].data;
    } else {
      return API?.getSearch(keyword).then((data) => {
        console.info("calling api");

        if (data && data.sickName.length > 0) {
          const expiration = Date.now() + EXPIRATION_TIME;
          const cacheData = { data: data.sickName, expiration };
          cache[keyword] = cacheData;
          return data.sickName;
        }
      });
    }
  };
  return searchKeyword;
})();

export default getSearchKeywordWithCach;
