**Wanted-Pre-Onboarding-Fontend-Week4**

## 프로젝트 소개

사용자가 입력한 검색어에 대한 검색어 추천 기능을 제공하는 애플리케이션입니다.

</br>
</br>

## 사용방법

**server** (해당 서버는 [assignment-api](https://github.com/walking-sunset/assignment-api)에 의존하고 있습니다.) 폴더에서 `npm install` 후 `npm start`로 실행시키면 서버를 실행할 수 있습니다.

</br>

**client** 폴더에서 `npm install` 후 `npm start`로 실행시키면 애플리케이션을 실행할 수 있습니다.

</br>
</br>

## 폴더 구조

```
src
├─components
├─context
├─hooks
├─service
├─style
└─utils
```

</br>
</br>

## 구현목표

**[한국임상정보](https://clinicaltrialskorea.com/) 사이트의 검색영역을 클론하기**

</br>

### 검색창 및 검색어 추천 기능 구현

- 질환명 검색시 API 호출 통해서 검색어 추천 기능 구현
- 입력마다 API 호출되지 않도록 API 호출 횟수를 줄이는 전략 수립 및 수행
- 키보드만으로 추천 검색어들로 이동 가능하도록 구현

</br>
</br>

### 캐싱 기능 구현

- API 호출별로 로컬 캐싱 구현

</br>

## 사용한 기술

- React
- TypeScirpt
- SCSS
- Axios

</br>
</br>

## 구현 방법

### 1. API 호출 횟수 줄이기

`setTimeOut` 과 `clearTimeout` 함수를 사용하여 입력 이벤트가 발생한 후 일정 시간 동안 대기한 다음 API를 호출하도록 하였습니다.

</br>

```ts
// scr/hooks/useSearch.tsx

useEffect(() => {
  const delayTimer = setTimeout(() => {
    getSearchData(word);
  }, 500);

  return () => {
    clearTimeout(delayTimer);
  };
}, [word]);
```

입력창(input)에 단어가 작성 되면 onChange 이벤트가 발생하게 되고 word의 상태 값이 변경됩니다. 변경 될때마다 useEffect 함수 안에 있는 `setTimeOut` 함수가 실행되어 시간을 카운트합니다.
입력창의 입력이 완료되어 더 이상 onChage 이벤트가 발생하지 않으면 0.5초 후에 `getSearchData`함수(API 호출 함수)를 실행하게 됩니다.

</br>

![reduce](https://github.com/lIIIlIIIlIIIl/wanted-pre-onboarding-frontend-week4/assets/101863629/0110034c-b73b-4dbc-8593-00c6e9706ca7)

</br>
</br>

### 2. API 호출별로 캐싱하기(expire time 구현)

useSate을 사용하여 검색어에 대한 자동 완성 데이터를 로컬 캐시에 저장하여 중복 API 호출을 하지 않도록 하였습니다.

</br>

```ts
// scr/utils/getSearchKeywordWithCach.ts

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
```

위 코드에서 `cache` 객체를 사용하여 로컬 캐시를 관리합니다. `cache` 객체는 검색어를 키로 하고, 해당 검색어와 연관된 자동 완성 데이터를 `data`의 값으로, `expiration`의 값으로 만료시간을 갖는 매핑 구조를 가지고 있습니다.

검색어를 입력 받으면 로컬 캐시(`cache`)를 확인하고, 캐시에 해당 데이터가 있는지 확인합니다. 그 후에 캐시 데이터가 만료되지 않은 경우에는 API를 호출하지 않고 캐시된 데이터를 사용합니다. 캐시에 데이터가 없거나, 데이터가 있지만 시간이 만료된 경우에는 API를 호출하여 데이터를 가져온 후 데이터를 업데이트 합니다.

</br>

![cache](https://github.com/lIIIlIIIlIIIl/wanted-pre-onboarding-frontend-week4/assets/101863629/fe491405-0602-4d9d-bcbc-c2b68c10d6ea)

</br>
</br>

### 3. 키보드만으로 추천 검색어들로 이동

키 이벤트를 사용하여 키보드의 방향키를 사용하여 추천 검색어들로 이동할 수 있도록 하였습니다.

</br>

```tsx
// src/components/Search.tsx

const [selectedIndex, setSelectedIndex] = useState<number>(-1);
const [autoSearchKeyword, setAutoSearchKeyword] = useState("");

const handleKeyUp = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (key === "Enter") {
        // 동작 수행
    }
    if (key === "ArrowDown" || key === "ArrowRight") {
        // 동작 수행
    }

    if (key === "ArrowUp" || key === "ArrowLeft") {
        // 동작 수행
    }

    if (key === "Escape") {
        // 동작 수행
    }

    if (key === "Backspace") {
        // 동작 수행
    }
  }

  return (
    // ...

          <input
            type="text"
            placeholder="질환명을 입력해주세요."
            value={autoSearchKeyword ? autoSearchKeyword : keyword}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              return setKeyword(event.target.value);
            }}
            onKeyDown={handleKeyUp}
          />

    // ...
  )
};
```

`input`의 `onKeydown`이벤트를 사용하여 입력창에서 방향키와 Enter, Delete, Escape(ESC) 키에 따라 `selectedIndex`의 상태 값이 변경되고, 이에 따라 입령창의 입력 내용이 추천 검색어로 자동 변경될 수 있도록 `autoSearchKeyword` 상태 값을 선택된 추천 검색어로 바뀌도록 하였습니다.

</br>

```tsx
// src/components/SearchList.tsx

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
```

추천 검색어(`searchList`)의 index가 `selectedIndex`인 경우 `highlight` 스타일을 적용하여 선택된 UI를 확인할 수 있도록 하였습니다.

</br>

![keyEvent](https://github.com/lIIIlIIIlIIIl/wanted-pre-onboarding-frontend-week4/assets/101863629/67796fe4-9cf6-4362-b6cf-2761d35597a1)
