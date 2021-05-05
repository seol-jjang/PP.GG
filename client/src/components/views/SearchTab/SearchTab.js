import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const SearchTab = ({ focus }) => {
  const [searchRecord, setSearchRecord] = useState(
    JSON.parse(localStorage.getItem("latelySearch")) || []
  );

  const renderNickname = searchRecord.map((name, index) => {
    return (
      <li key={index}>
        <Link to={`/summoner/${name.replace(/ /g, "+")}`}>{name}</Link>
      </li>
    );
  });

  return (
    <ul className={`lately-record`}>
      {searchRecord.length > 0 ? (
        <>{renderNickname}</>
      ) : (
        <p>최근 검색한 소환사가 없습니다.</p>
      )}
    </ul>
  );
};

export default SearchTab;
