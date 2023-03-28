const express = require("express");
const Hunter = require("./controllers");
const { getReqData } = require("./utils");
require("dotenv").config();

const app = express();

const PORT = process.env.PORT || 5000;

function sendJSON(obj, res) {
  const json = JSON.stringify(obj);
  res.send(json);
}

function checkObj(obj, res) {
  if (obj) {
    sendJSON(obj, res);
  } else {
    res.status(404).send();
  }
}

app.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});

app.get("/api/hunters", async (req, res) => {
  const hunters = await new Hunter().getHunters();

  checkObj(hunters, res);
});

app.get("/api/hunters/:id", async (req, res) => {
  const id = req.params.id;
  const hunter = await new Hunter().getHunter(id);

  checkObj(hunter, res);
});

app.post("/api/hunters", async (req, res) => {
  let hunter_data = await getReqData(req);
  const jsonParse = JSON.parse(hunter_data);
  let hunter = await new Hunter().createHunter(jsonParse);

  checkObj(hunter, res);
});

app.put("/api/hunters/:id.:firstName", async (req, res) => {
  const id = req.params.id;
  const firstName = req.params.firstName;
  let updated_hunter = await new Hunter().updateHunter(id, firstName);

  checkObj(updated_hunter, res);
});

app.delete("/api/hunters/:id", async (req, res) => {
  const id = req.params.id;
  let message = await new Hunter().deleteHunter(id);

  checkObj(message, res);
});
