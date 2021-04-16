import React, { useEffect, useState } from "react";
import { getSummonerSpell } from "../../../utils/api";

const SummonerSpell = ({ spellId }) => {
  const [spellName, setSpellName] = useState(null);
  useEffect(() => {
    let mounted = true;
    if (mounted) {
      getSummonerSpell().then((response) => {
        const { data } = response.data;

        setSpellName(
          Object.values(data).find((spell) => Number(spell.key) === spellId).id
        );
      });
    }
    return () => {
      mounted = false;
    };
  }, [spellId]);
  return (
    <>
      {spellName && (
        <span className="spell-icon">
          <img
            src={`${process.env.REACT_APP_DATA_API}/img/spell/${spellName}.png`}
            alt={spellName}
          />
        </span>
      )}
    </>
  );
};

export default SummonerSpell;
