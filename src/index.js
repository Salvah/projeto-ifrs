const express = require("express");
const cors = require("cors");
const { format } = require("date-fns");

const ptBRLocale = require("date-fns/locale/pt-BR");

const data = [];

const app = express();

app.set("view engine", "ejs");

app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());
app.use(cors());

app.post("/esp8266", (req, res) => {
  const { temperature, humidity, uv, pv } = req.body;
  const timestamp = format(new Date(), "dd/MM/yyyy HH:mm", {
    locale: ptBRLocale,
  });
  data.push({ temperature, humidity, uv, pv, timestamp });
  res.send("RESPOSTA: OK");
});

app.get("/data", (req, res) => {
  res.json(data);
});

app.get("/", (req, res) => {
  res.send("OK");
});

app.get("/charts/humidity", (req, res) => {
  const humidity = [];
  const timestamp = [];
  data.slice(-60).forEach((d) => {
    humidity.push(d.humidity);
    timestamp.push(d.timestamp.substr(11, 5));
  });

  res.render("index", {
    label: "Umidade",
    data: humidity,
    timestamp,
  });
});

app.get("/charts/temperature", (req, res) => {
  const temperature = [];
  const timestamp = [];
  data.slice(-60).forEach((d) => {
    temperature.push(d.temperature);
    timestamp.push(d.timestamp.substr(11, 5));
  });

  res.render("index", {
    label: "Temperatura",
    data: temperature,
    timestamp,
  });
});

app.get("/charts/uv", (req, res) => {
  const uv = [];
  const timestamp = [];
  data.slice(-60).forEach((d) => {
    uv.push(d.uv);
    timestamp.push(d.timestamp.substr(11, 5));
  });

  res.render("index", {
    label: "UV",
    data: uv,
    timestamp,
  });
});

app.get("/charts/pv", (req, res) => {
  const pv = [];
  const timestamp = [];
  data.slice(-60).forEach((d) => {
    pv.push(d.pv);
    timestamp.push(d.timestamp.substr(11, 5));
  });

  res.render("index", {
    label: "PV",
    data: pv,
    timestamp,
  });
});

app.listen(process.env.PORT || 5000, () => {
  console.log("start: ");
});
