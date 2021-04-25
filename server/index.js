const express = require("express");
const bodyParser = require("body-parser");

var cors = require("cors");
// // const pino = require("express-pino-logger")();
// // const client = require("twilio")(
// //   process.env.TWILIO_ACCOUNT_SID,
// //   process.env.TWILIO_AUTH_TOKEN
// // );

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

var twilio = require("twilio");

var accountSid = SID; // Your Account SID from www.twilio.com/console
var authToken = AUTH; // Your Auth Token from www.twilio.com/console
var client = new twilio(accountSid, authToken);

console.log("hello!");

// app.use(pino);

// app.get("/api/greeting", (req, res) => {
//   const name = req.query.name || "World";

//   res.setHeader("Content-Type", "application/json");
//   res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
// });

app.post("/api/messages", (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Max-Age", "1800");
  res.setHeader("Access-Control-Allow-Headers", "content-type");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );
  res.header("Content-Type", "application/json");
  console.log(req.body);
  client.messages
    .create({
      body: req.body.text,
      to: req.body.to, // Text this number
      from: "+17066617245", // From a valid Twilio number
    })
    .then((message) => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch((err) => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});

app.listen(3001, () =>
  console.log("Express server is running on localhost:3001")
);
