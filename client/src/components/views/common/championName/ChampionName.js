import React, { useEffect, useState } from "react";
import { getChampionData } from "../../../utils/api";
import "../../../../styles/iconStyle/championIcon.scss";

const ChampionName = ({ championId }) => {
  const [championName, setChampionName] = useState(null);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getChampionData().then((response) => {
        const { data } = response.data;

        setChampionName(
          Object.values(data).find(
            (champion) => Number(champion.key) === championId
          ).name
        );
      });
    }
    return () => {
      mounted = false;
    };
  }, [championId]);
  return <>{championName && <p className="champion-name">{championName}</p>}</>;
};

export default ChampionName;
