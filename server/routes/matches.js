const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Match } = require("../models/Match");

router.post("/matchData", (req, res) => {
  const fetchMatchData = (newData) => {
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
          const date = Date.now();
          if (newData) {
            const newMatchData = {
              accountId: req.body.accountId,
              matchData: matchDetailData,
              updateDate: date
            };
            return Match.findOneAndReplace(
              { accountId: req.body.accountId },
              newMatchData,
              { returnNewDocument: true }
            ).then((response) => {
              return res.status(200).json({
                matchData: response.matchData,
                updateDate: response.date
              });
            });
          }
          const match = new Match({
            accountId: req.body.accountId,
            matchData: matchDetailData,
            updateDate: date
          });
          match.save((err, doc) => {});
          return res.status(200).json({
            matchData: matchDetailData,
            updateDate: date
          });
        });
      });
  };

  Match.findOne({ accountId: req.body.accountId }, (err, data) => {
    let newData;
    if (data) {
      newData = true;
      const date = Date.now();
      const updateTime = Math.floor(
        (date - data.updateDate) / 1000 / 60 / 60 / 24
      );
      if (req.body.refresh) {
        fetchMatchData(newData);
      } else {
        if (updateTime > 2) {
          fetchMatchData(newData);
        } else {
          return res.json({
            matchData: data.matchData,
            updateDate: data.updateDate
          });
        }
      }
    } else {
      newData = false;
      fetchMatchData(newData);
    }
  });
});

router.post("/moreMatchData", (req, res) => {
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
        return res.status(200).json({
          matchData: matchDetailData
        });
      });
    });
});

module.exports = router;
