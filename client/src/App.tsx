import React from "react";
import Search from "./components/Search";

function App() {
  return (
    <div>
      <main className="main fl-column">
        <div className="fl-column">
          <h1>국내 모든 임상시험 검색하고</h1>
          <h1>온라인으로 참여하기</h1>
        </div>
        <div className="input-wrap">
          <Search />
        </div>
      </main>
    </div>
  );
}

export default App;
