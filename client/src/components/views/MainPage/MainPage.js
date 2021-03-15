import React, { useEffect, useState } from "react";
import { getChampionRotations } from "../../utils/api";
import ChampionIcon from "../common/championIcon/ChampionIcon";
import ChampionName from "../common/championName/ChampionName";
import SearchInput from "./SearchInput";

const MainPage = () => {
  const [champRotations, setChampRotations] = useState(null);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getChampionRotations().then((response) => {
        setChampRotations(response.data.rotationList);
      });
    }
    return (mounted = false);
  }, []);

  return (
    <>
      <SearchInput />
      {champRotations && (
        <div className="champion-rotations">
          <ul className="champ-list">
            <h4>챔피언 로테이션</h4>
            <div>
              {champRotations.map((championId, index) => {
                return (
                  <li key={index}>
                    <ChampionIcon championId={championId} />
                    <ChampionName championId={championId} />
                  </li>
                );
              })}
            </div>
          </ul>
        </div>
      )}
    </>
  );
};

export default MainPage;
