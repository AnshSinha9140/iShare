const express = require("express");
var Qrcode = require("qrcode");
const app = express();
const cors = require("cors");
const fs = require("fs");
var mime = require("mime");
var bodyParser = require("body-parser");
const PORT = process.env.PORT || 7000;
app.set("view engine", "ejs");

app.use(cors());
app.use(express.static(__dirname + "/"));
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + "./public/style.css"));
app.use(express.static(__dirname + "./public/client.js"));
app.use(express.static(__dirname + "./qrcode.min.js"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/login.html");
});

app.post("/barcode", (req, res) => {
  var name = req.body.fullname;

  console.log(name);

  res.redirect("/barcodescan/:" + name);
});

app.get("/barcodescan/:name", (req, res) => {
  var data = req.params.name;
  var newdata = data.substr(1);

  var hahah;

  Qrcode.toDataURL(newdata, (err, url) => {
    hahah = url.toString();
    res.render("barcode.ejs", { hahah, newdata });
  });
});

app.get("/sharefiles", (req, res) => {
  var lobsbs = req.params.pass;
  console.log(lobsbs);
  res.sendFile(__dirname + "/index.html");
});

app.post("/sendImage", (req, res) => {
  console.log(req.body);
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}`);
});
