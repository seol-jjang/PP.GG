import React, { useEffect, useState } from "react";
import { getChampionData } from "../../../../utils/api";

function ChampionIcon({ championId }) {
  const [championName, setChampionName] = useState(null);
  useEffect(() => {
    getChampionData().then((response) => {
      const { data } = response.data;

      setChampionName(
        Object.values(data).find(
          (champion) => Number(champion.key) === championId
        ).id
      );
    });
  }, [championId]);
  return (
    <span className="champion-icon">
      <img
        src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/champion/${championName}.png`}
        alt={championName}
      />
    </span>
  );
}

export default ChampionIcon;
