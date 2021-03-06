import React, { useEffect, useRef, useState } from "react";
import {
  getGameDuration,
  getKDARatio,
  getQueueType,
  getTierAvg,
  getTimeStamp
} from "../../../utils/gameUtil";
import ChampionIcon from "../../common/championIcon/ChampionIcon";
import ItemIcon from "../../common/ItemIcon";
import SummonerSpell from "../../common/summonerSpell/SummonerSpell";

const MatchItem = ({ match }) => {
  const {
    win,
    queue,
    participant,
    participantIdentities,
    gameDuration,
    timestamp
  } = match;

  return (
    <li className={`${win ? "matchitem--win" : "matchitem--lose"}`}>
      {console.log(match)}
      <section className="game-info">
        <p className="sub-text queue-type">{getQueueType(queue)}</p>
        <p className="sub-text">{getTimeStamp(timestamp)}</p>
        <p className={`match-result ${win ? "win" : "lose"}`}>
          {match.win ? "승리" : "패배"}
        </p>
        <p className="sub-text">{getGameDuration(gameDuration)}</p>
      </section>
      <section className="game-setting">
        <ChampionIcon championId={participant.championId} />
        <div className="summoner-setting">
          <div className="summoner-spells">
            <SummonerSpell spellId={participant.spell1Id} />
            <SummonerSpell spellId={participant.spell2Id} />
          </div>
          <div className="summoner-runes"></div>
        </div>
      </section>
      <section className="kda">
        <p className="kda__KDA">
          <span>{participant.stats.kills} </span>/
          <span className="death"> {participant.stats.deaths} </span>/
          <span> {participant.stats.assists}</span>
        </p>
        <p className="kda__ratio">
          <span>
            {getKDARatio(
              participant.stats.kills,
              participant.stats.deaths,
              participant.stats.assists
            )}
          </span>{" "}
          평점
        </p>
      </section>
      <section className="summoner-gameInfo">
        <p>{participant.stats.champLevel} 레벨</p>
        <p>
          {participant.stats.totalMinionsKilled +
            participant.stats.neutralMinionsKilled}{" "}
          CS
        </p>
      </section>
      <section className="items">
        <div className="items__item">
          <ItemIcon stats={participant.stats} />
        </div>
        <span className="item-bg ward">
          <img
            src={`http://ddragon.leagueoflegends.com/cdn/11.5.1/img/item/${participant.stats.item6}.png`}
            alt={`item_${participant.stats.item6}`}
          />
        </span>
      </section>
    </li>
  );
};

export default MatchItem;
