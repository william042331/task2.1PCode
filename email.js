const api_key = '7145db8db76a88362a2a077354032a70-28e9457d-692081f3';
const domain = 'sandboxa40055ab43e046cd8b0a4a0cf61def28.mailgun.org';
const mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });
const https = require("https");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function(req, res) {
    res.sendFile(__dirname + "/mailgun.html");
});

app.post("/", function(req, res) {
    const email = req.body.email;
    const message = req.body.body;  

    const data = {
        from: 'kuku162004@gmail.com',
        to: email,
        subject: "Hi this mail is from Kuku",
        text: message,  
    };
    mailgun.messages().send(data, function(error, body) {
        if (error) {
            console.error("Mailgun error:", error);
            if (error.message) {
                console.error("Error message:", error.message);
            }
            res.status(500).send("Mail not sent");
        } else {
            console.log("Mailgun response:", body);
            res.send("Mail sent");
        }
    });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});