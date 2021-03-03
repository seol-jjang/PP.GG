import axios from "axios";
import React, { useEffect, useState } from "react";

function MatchListSection({ accountId }) {
  const [isCancelled, setIsCancelled] = useState(false);
  const [finished, setFinished] = useState(false);
  const [count, setCount] = useState("20");
  const [matchList, setMatchList] = useState(null);
  const [detailData, setDetailData] = useState(null);

  useEffect(() => {
    const getMatchData = async () => {
      const body = {
        accountId: accountId,
        count: count
      };
      const matchData = await axios
        .post("/ppgg/matches/matchList", body)
        .then((response) => {
          setMatchList(response.data.matchData.matches);
          return response.data.matchData.matches;
        });
      return matchData;
    };

    if (!isCancelled) {
      getMatchData();
      setIsCancelled(true);
    }
    return () => {
      setIsCancelled(true);
    };
  }, [accountId, count, isCancelled, matchList]);

  useEffect(() => {
    const getDetailData = async () => {
      const result = await Promise.all(
        matchList.map(async (match) => {
          const body = {
            gameId: match.gameId
          };
          const res = await axios.post("/ppgg/matches/matchDetail", body);
          const dataObj = {
            gameId: res.data.matchData.gameId,
            champion: match.champion,
            gameCreation: res.data.matchData.gameCreation,
            gameDuration: res.data.matchData.gameDuration,
            gameMode: res.data.matchData.gameMode,
            participantIdentities: res.data.matchData.participantIdentities,
            participants: res.data.matchData.participants,
            teams: res.data.matchData.teams
          };
          return dataObj;
        })
      );
      return result;
    };
    if (matchList !== null) {
      getDetailData().then((response) => setDetailData(response));
    }
  }, [matchList]);

  const renderMatchResult = () => {
    const result = detailData.map((match, index) => {
      let playerNumber;
      // eslint-disable-next-line array-callback-return
      match.participantIdentities.map((participant) => {
        if (participant.player.accountId === accountId) {
          playerNumber = participant.participantId;
        }
      });
      return (
        <li key={index} className="matchlist__item">
          {match.participants[playerNumber - 1].stats.win ? (
            <p>승리</p>
          ) : (
            <p>패배</p>
          )}
        </li>
      );
    });
    return result;
  };

  if (isCancelled) {
    if (detailData !== null && matchList !== null) {
      return (
        <ul className="matchlist">
          {renderMatchResult()}
          {console.log(detailData)}
        </ul>
      );
    } else {
      return <section></section>;
    }
  } else {
    return <ul></ul>;
  }
}

export default MatchListSection;
