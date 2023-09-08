const express = require("express");
const app = express();

app.use("/discord", require("./routes/discord"));

app.get("*", ({ res }) => {
  res.status(200).send({ status: 200, msg: "api healthy" });
})

app.listen(3000);