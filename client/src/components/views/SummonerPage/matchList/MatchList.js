import React, { useEffect, useRef, useState } from "react";
import { asyncUtil } from "../../../utils/asyncUtil";
import MatchItem from "./MatchItem";
import { getMatchData } from "../../../utils/api";

const MatchList = ({ matchData, accountId }) => {
  const itemRef = useRef(null);
  const [matchList, setMatchList] = useState([]);
  const [count, setCount] = useState({
    min: 0,
    max: 10
  });

  useEffect(() => {
    setMatchList(matchData);
  }, []);

  const onMoreDataHandle = () => {
    // window.scrollTo(
    //   0,
    //   window.pageYOffset + itemRef.current.getBoundingClientRect().top
    // );
    setCount({
      min: count.min + 10,
      max: count.max + 10
    });
    const newCount = {
      min: count.min + 10,
      max: count.max + 10
    };
    Promise.all([asyncUtil(getMatchData(accountId, newCount), 1000)]).then(
      ([matchDetailData]) => {
        setMatchList((data) => data.concat(matchDetailData.data.matchData));
        console.log(itemRef);
        console.log(itemRef.current.getBoundingClientRect());
      }
    );
  };
  return (
    <>
      <ul className="matchlist">
        {matchList.length !== 0 &&
          matchList.map((match, index) => {
            return (
              <li
                className="matchlist__game"
                key={index}
                ref={index.toString().lastIndexOf(9) < 0 ? null : itemRef}
              >
                {console.log(match)}
                <MatchItem match={match} />
              </li>
            );
          })}
      </ul>
      {matchList.length >= 50 ? (
        <button className="more-btn" onClick={onMoreDataHandle} disabled>
          더보기
        </button>
      ) : (
        <button className="more-btn" onClick={onMoreDataHandle}>
          더보기
        </button>
      )}
    </>
  );
};

export default MatchList;
