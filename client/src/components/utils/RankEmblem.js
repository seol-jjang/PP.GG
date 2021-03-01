import React from "react";
import IRON from "../../assets/ranked-emblems/Emblem_Iron.png";
import BRONZE from "../../assets/ranked-emblems/Emblem_Bronze.png";
import SILVER from "../../assets/ranked-emblems/Emblem_Silver.png";
import GOLD from "../../assets/ranked-emblems/Emblem_Gold.png";
import PLATINUM from "../../assets/ranked-emblems/Emblem_Platinum.png";
import DIAMOND from "../../assets/ranked-emblems/Emblem_Diamond.png";
import MASTER from "../../assets/ranked-emblems/Emblem_Master.png";
import GRANDMASTER from "../../assets/ranked-emblems/Emblem_Grandmaster.png";
import CHALLENGER from "../../assets/ranked-emblems/Emblem_Challenger.png";
import UNRANK from "../../assets/ranked-emblems/Emblem_Unrank.png";

const RankEmblem = ({ tier, setTextColor }) => {
  switch (tier) {
    case "IRON":
      setTextColor("#524f4c");
      return (
        <div className="emblem-img">
          <img src={IRON} alt={tier} />
        </div>
      );
    case "BRONZE":
      setTextColor("#915639");
      return (
        <div className="emblem-img">
          <img src={BRONZE} alt={tier} />
        </div>
      );
    case "SILVER":
      setTextColor("#5b6f74");
      return (
        <div className="emblem-img">
          <img src={SILVER} alt={tier} />
        </div>
      );
    case "GOLD":
      setTextColor("#caa14a");
      return (
        <div className="emblem-img">
          <img src={GOLD} alt={tier} />
        </div>
      );
    case "PLATINUM":
      setTextColor("#1c8059");
      return (
        <div className="emblem-img">
          <img src={PLATINUM} alt={tier} />
        </div>
      );
    case "DIAMOND":
      setTextColor("#4c649f");
      return (
        <div className="emblem-img">
          <img src={DIAMOND} alt={tier} />
        </div>
      );
    case "MASTER":
      setTextColor("#6d30a0");
      return (
        <div className="emblem-img">
          <img src={MASTER} alt={tier} />
        </div>
      );
    case "GRANDMASTER":
      setTextColor("#bf1e1e");
      return (
        <div className="emblem-img">
          <img src={GRANDMASTER} alt={tier} />
        </div>
      );
    case "CHALLENGER":
      setTextColor("#1e53bf");
      return (
        <div className="emblem-img">
          <img src={CHALLENGER} alt={tier} />
        </div>
      );

    default:
      setTextColor("#d8d8d8");
      return (
        <div className="emblem-img">
          <img src={UNRANK} alt="unrank" />
        </div>
      );
  }
};

export default RankEmblem;
