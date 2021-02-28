const express = require("express");
const cors = require("cors");
const { format } = require("date-fns");

const data = [];

const app = express();
app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

app.post("/esp8266", (req, res) => {
  const { temperature, humidity, uv, pv } = req.body;
  const timestamp = format(new Date(), "dd/MM/yyyy HH:mm");
  data.push({ temperature, humidity, uv, pv, timestamp });
  res.send("RESPOSTA: OK");
});

app.get("/data", (req, res) => {
  res.json(data);
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.listen(process.env.PORT || 4000, () => {
  console.log("start: " + process.env.PORT);
});
