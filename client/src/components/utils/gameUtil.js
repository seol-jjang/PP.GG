export const getQueueType = (queueId) => {
  switch (queueId) {
    case 0:
      return "커스텀";
    case 420:
      return "솔랭";
    case 430:
      return "일반";
    case 440:
      return "자유랭";
    case 450:
      return "칼바람나락";
    case 830:
    case 840:
    case 850:
      return "봇전";
    case 900:
      return "우르프";
    case 920:
      return "포로왕";
    case 2000:
    case 2010:
    case 2020:
      return "튜토리얼";
    default:
      return "이벤트";
  }
};

export const getRankEmblem = (tier) => {
  switch (tier) {
    case "IRON":
      return {
        src:
          "https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/Emblem_Iron.png",
        colorCode: "#524f4c"
      };
    case "BRONZE":
      return {
        src:
          "https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/Emblem_Bronze.png",
        colorCode: "#915639"
      };
    case "SILVER":
      return {
        src:
          "https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/Emblem_Silver.png",
        colorCode: "#5b6f74"
      };
    case "GOLD":
      return {
        src:
          "https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/Emblem_Gold.png",
        colorCode: "#caa14a"
      };
    case "PLATINUM":
      return {
        src:
          "https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/Emblem_Platinum.png",
        colorCode: "#1c8059"
      };
    case "DIAMOND":
      return {
        src:
          "https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/Emblem_Diamond.png",
        colorCode: "#4c649f"
      };
    case "MASTER":
      return {
        src:
          "https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/Emblem_Master.png",
        colorCode: "#6d30a0"
      };
    case "GRANDMASTER":
      return {
        src:
          "https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/Emblem_Grandmaster.png",
        colorCode: "#bf1e1e"
      };
    case "CHALLENGER":
      return {
        src:
          "https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/Emblem_Challenger.png",
        colorCode: "#1e53bf"
      };
    default:
      return {
        src:
          "https://ppgg.s3.ap-northeast-2.amazonaws.com/tier-emblems/provisional.png",
        colorCode: "#d8d8d8"
      };
  }
};

export const getGameDuration = (gameDuration) => {
  const second = Math.floor(gameDuration % 60);
  const minute = Math.floor(gameDuration / 60);
  return `${minute}분 ${second}초`;
};

export const getTimeStamp = (timestamp) => {
  const date = Date.now();

  const time = date - timestamp;
  const hours = Math.floor(time / 1000 / 60 / 60);
  const minutes = Math.floor((time / 1000 / 60) % 60);
  const seconds = Math.floor(((time / 1000) % 60) % 60);

  if (hours >= 1) {
    if (hours >= 24) {
      const day = Math.round(hours / 24);
      if (day === 1) {
        return "하루 전";
      } else {
        return `${day}일 전`;
      }
    }
    return `${hours}시간 전`;
  } else if (minutes < 60 && minutes > 0) {
    return `${minutes}분 전`;
  } else {
    return `${seconds}초 전`;
  }
};

export const getKDARatio = (kills, deaths, assists) => {
  if (deaths === 0) {
    return "Perfect";
  } else {
    const involvementRate = (kills + assists) / deaths;
    return `${involvementRate.toFixed(2)}`;
  }
};

export const getItemImage = () => {};

export const getCScalc = (gameDuration, cs) => {
  const second = Number((Math.floor(gameDuration % 60) / 60).toFixed(2));
  const minute = Math.floor(gameDuration / 60);

  const csM = cs / (second + minute);
  return csM.toFixed(1);
};

export const getKillstreak = (stats) => {
  if (stats.pentaKills > 0) {
    return <p className="killstreak">펜타킬</p>;
  } else if (stats.quadraKills > 0) {
    return <p className="killstreak">쿼드라킬</p>;
  } else if (stats.tripleKills > 0) {
    return <p className="killstreak">트리플킬</p>;
  } else if (stats.doubleKills > 0) {
    return <p className="killstreak">더블킬</p>;
  } else {
    return;
  }
};

export const getKillinvolvement = (participants, participant) => {
  const totalKills = participants.reduce((acc, current) => {
    if (current.teamId === participant.teamId) {
      return acc + current.stats.kills;
    } else {
      return acc;
    }
  }, 0);
  const playerKA = participant.stats.kills + participant.stats.assists;
  if (totalKills === 0) {
    return 0;
  }
  return ((playerKA / totalKills) * 100).toFixed(0);
};

// export const getTierAvg = (participants) => {
//   participants.map(async (player) => {
//     console.log(player);
//     Promise.all([
//       await asyncUtil(getSummonerRank(player.summonerId), 1000)
//     ]).then(([summonerRankData]) => {});
//   });
// };
