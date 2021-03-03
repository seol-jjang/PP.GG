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

const RankEmblem = ({ tier }) => {
  switch (tier) {
    case "IRON":
      return (
        <div className="emblem-img">
          <img src={IRON} alt={tier} />
        </div>
      );
    case "BRONZE":
      return (
        <div className="emblem-img">
          <img src={BRONZE} alt={tier} />
        </div>
      );
    case "SILVER":
      return (
        <div className="emblem-img">
          <img src={SILVER} alt={tier} />
        </div>
      );
    case "GOLD":
      return (
        <div className="emblem-img">
          <img src={GOLD} alt={tier} />
        </div>
      );
    case "PLATINUM":
      return (
        <div className="emblem-img">
          <img src={PLATINUM} alt={tier} />
        </div>
      );
    case "DIAMOND":
      return (
        <div className="emblem-img">
          <img src={DIAMOND} alt={tier} />
        </div>
      );
    case "MASTER":
      return (
        <div className="emblem-img">
          <img src={MASTER} alt={tier} />
        </div>
      );
    case "GRANDMASTER":
      return (
        <div className="emblem-img">
          <img src={GRANDMASTER} alt={tier} />
        </div>
      );
    case "CHALLENGER":
      return (
        <div className="emblem-img">
          <img src={CHALLENGER} alt={tier} />
        </div>
      );

    default:
      return (
        <div className="emblem-img">
          <img src={UNRANK} alt="unrank" />
        </div>
      );
  }
};

export default RankEmblem;
