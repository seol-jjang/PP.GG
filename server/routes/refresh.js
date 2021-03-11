const express = require("express");
const router = express.Router();
const axios = require("axios");
const { Summoner } = require("../models/Summoner");
const { Rank } = require("../models/Rank");
const { Match } = require("../models/Match");

router.post("/refreshSummoner", (req, res) => {
  axios
    .get(
      `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${encodeURI(
        req.body.nickname
      )}?api_key=${process.env.DEVELOPMENT_KEY}`
    )
    .then((response) => {
      const date = Date.now();
      const newSummonerData = {
        name: response.data.name,
        summonerData: response.data,
        updateDate: date
      };

      return Summoner.findOneAndReplace(
        { name: { $regex: req.body.nickname, $options: "i" } },
        newSummonerData,
        { returnNewDocument: true }
      );
    })
    .then((response) => {
      return res.status(200).json({
        user: response.summonerData,
        updateDate: response.updateDate
      });
    })
    .catch((error) => {
      if (error.response.status === 404) {
        res.status(200).json({
          user: null
        });
      } else {
        console.log(error);
      }
    });
});

router.post("/refreshRank", (req, res) => {
  axios
    .get(
      `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${req.body.summonerId}?api_key=${process.env.DEVELOPMENT_KEY}`
    )
    .then((response) => {
      const resultData = Object.values(response.data).find(
        (rankType) => rankType.queueType === "RANKED_SOLO_5x5"
      );
      const date = Date.now();
      const newRankData = {
        summonerId: req.body.summonerId,
        rankData: resultData,
        updateDate: date
      };
      return Rank.findOneAndReplace(
        { summonerId: req.body.summonerId },
        newRankData,
        { returnNewDocument: true }
      );
    })
    .then((response) => {
      return res.status(200).json({
        rankData: response.resultData,
        updateDate: response.date
      });
    })
    .catch((error) => {
      return res.json({ success: false, error });
    });
});

router.post("/refreshMatchData", (req, res) => {
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
      Promise.all([getMatchDetail(matches)])
        .then(([matchDetailData]) => {
          const date = Date.now();
          const newMatchData = {
            accountId: req.body.accountId,
            matchData: matchDetailData,
            updateDate: date
          };
          return Match.findOneAndReplace(
            { accountId: req.body.accountId },
            newMatchData,
            { returnNewDocument: true }
          );
        })
        .then((response) => {
          return res.status(200).json({
            matchData: response.matchData,
            updateDate: response.date
          });
        });
    });
});

module.exports = router;
