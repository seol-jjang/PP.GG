import React, { useEffect, useState } from "react";
import { getChampionData } from "../../../utils/api";
import "../../../../styles/common/championIcon.scss";

const ChampionName = ({ championId }) => {
  const [championName, setChampionName] = useState(null);
  useEffect(() => {
    getChampionData().then((response) => {
      const { data } = response.data;

      setChampionName(
        Object.values(data).find(
          (champion) => Number(champion.key) === championId
        ).name
      );
    });
  }, [championId]);
  return <>{championName && <p className="champion-name">{championName}</p>}</>;
};

export default ChampionName;
