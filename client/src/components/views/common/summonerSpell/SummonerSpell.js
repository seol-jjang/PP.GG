import React, { useEffect, useState } from "react";
import { getSummonerSpell } from "../../../utils/api";
import "../../../../styles/common/spellIcon.scss";

const SummonerSpell = ({ spellId }) => {
  const [spellName, setSpellName] = useState(null);
  useEffect(() => {
    getSummonerSpell().then((response) => {
      const { data } = response.data;

      setSpellName(
        Object.values(data).find((spell) => Number(spell.key) === spellId).id
      );
    });
  }, [spellId]);
  return (
    <>
      {spellName && (
        <span className="spell-icon">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/spell/${spellName}.png`}
            alt={spellName}
          />
        </span>
      )}
    </>
  );
};

export default SummonerSpell;
