const express = require("express");
const cors = require("cors");
const { format } = require("date-fns");

const data = [];

const app = express();
app.use(cors());

app.get("/esp8266", (req, res) => {
  const { temperature, humidity } = req.query;
  const timestamp = format(new Date(), "dd/MM/yyyy HH:mm");
  data.push({ temperature, humidity, timestamp });
  res.send("RESPOSTA: OK");
});

app.get("/data", (req, res) => {
  res.json(data);
});

app.listen(process.env.PORT || 4000, () => {
  console.log("start");
});
