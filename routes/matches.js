const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/matchData", (req, res) => {
  const getMatchDetail = async (matches) => {
    const matchDetailData = [];
    await Promise.all(
      matches.map(async (match) => {
        await axios
          .get(
            `https://kr.api.riotgames.com/lol/match/v4/matches/${match.gameId}?api_key=${process.env.DEVELOPMENT_KEY}`
          )
          .then((response) => {
            const {
              gameId,
              gameDuration,
              teams,
              participants,
              participantIdentities
            } = response.data;

            const participantId = Object.values(participantIdentities).find(
              (participant) =>
                participant.player.accountId === req.body.accountId
            ).participantId;
            const teamId = Object.values(participants).find(
              (participant) => participant.participantId === participantId
            ).teamId;
            const win =
              Object.values(teams).find((team) => team.teamId === teamId)
                .win === "Win"
                ? true
                : false;

            matchDetailData.push({
              win: win,
              queue: match.queue,
              participantId: participantId,
              participant: participants.find(
                (participant) => participant.participantId === participantId
              ),
              participants: participants,
              participantIdentities: participantIdentities,
              gameId: gameId,
              gameDuration: gameDuration,
              teamId: teamId,
              teams: teams,
              timestamp: match.timestamp
            });
          });
      })
    );
    return matchDetailData.sort((a, b) => b.timestamp - a.timestamp);
  };
  axios
    .get(
      `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${req.body.accountId}?endIndex=${req.body.count.max}&beginIndex=${req.body.count.min}&api_key=${process.env.DEVELOPMENT_KEY}`
    )
    .then(async (response) => {
      const { matches } = response.data;
      Promise.all([getMatchDetail(matches)]).then(([matchDetailData]) => {
        return res.json({ matchData: matchDetailData });
      });
    });
});

module.exports = router;
