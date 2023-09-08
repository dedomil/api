require("dotenv").config();
const express = require("express");
const superagent = require("superagent").agent();
const router = express.Router();

router.get("/", async ({ res }) => {
  try {
    const { status, text } = await superagent.get(`https://api.lanyard.rest/v1/users/${process.env.DISCORD_ID}`)
    if (status == 200) {
      let { active_on_discord_web, active_on_discord_desktop, active_on_discord_mobile, discord_user } = JSON.parse(text).data;
      res.status(200).send({
        status: 200,
        msg: "fetched successfully",
        active: active_on_discord_desktop || active_on_discord_mobile || active_on_discord_web,
        username: discord_user.username,
        id: parseInt(discord_user.id)
      });
    } else {
      res.status(404).send({
        status: 404,
        msg: "unable to fetch"
      });
    }
  } catch (error) {
    res.status(500).send({
      status: 500,
      msg: "internal server error"
    });
  }
})

module.exports = router;

