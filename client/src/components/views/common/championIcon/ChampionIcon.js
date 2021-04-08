import React, { useEffect, useState } from "react";
import { getChampionData } from "../../../utils/api";
import "../../../../styles/iconStyle/championIcon.scss";

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
            src={`${process.env.REACT_APP_DATA_API}/img/champion/${championName}.png`}
            alt={championName}
          />
        </span>
      )}
    </>
  );
};

export default ChampionIcon;
