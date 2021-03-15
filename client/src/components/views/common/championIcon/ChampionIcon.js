import React, { useEffect, useState } from "react";
import { getChampionData } from "../../../utils/api";
import "../../../../styles/common/championIcon.scss";

const ChampionIcon = ({ championId }) => {
  const [championName, setChampionName] = useState(null);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getChampionData().then((response) => {
        const { data } = response.data;

        setChampionName(
          Object.values(data).find(
            (champion) => Number(champion.key) === championId
          ).id
        );
      });
    }
    return () => {
      mounted = false;
    };
  }, [championId]);
  return (
    <>
      {championName && (
        <span className="champion-icon">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${championName}.png`}
            alt={championName}
          />
        </span>
      )}
    </>
  );
};

export default ChampionIcon;
