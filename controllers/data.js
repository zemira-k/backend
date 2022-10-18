const fs = require("fs");
const qrcode = require("qrcode-terminal");

const { Client, LocalAuth } = require("whatsapp-web.js");

// console.log("Connection to Whatsapp Web Client");

const client = new Client({
  puppeteer: {
    executablePath: "/usr/bin/brave-browser-stable",
  },
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
  puppeteer: {
    headless: false,
  },
});

const userAuth = () => {
  client.initialize();

  client.on("qr", (qr) => {
    qrcode.generate(qr, { small: true });
  });

  client.on("authenticated", (session) => {
    console.log("WHATSAPP WEB => Authenticated");
  });
};

// Path where the session data will be stored

const sendToWhatsapp = (req, res) => {
  userAuth();
  const data = req.body;
  console.log(data);

  client.on("ready", async () => {
    console.log("Client is ready!");

    // Number where you want to send the message.
    const number = data.phone;

    // Your message.
    const text = `Good Morning ${data.name}.`;

    // Getting chatId from the number.
    // we have to delete "+" from the beginning and add "@c.us" at the end of the number.
    const chatId = number.substring(1) + "@c.us";

    // Sending message.
    client.sendMessage(chatId, text);
    return;
  });

  res.send({ message: "data was sent" });
};

module.exports = { sendToWhatsapp };
