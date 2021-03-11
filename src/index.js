const http = require("http");
const express = require("express");
const cors = require("cors");
const colyseus = require("colyseus");
const monitor = require("@colyseus/monitor").monitor;
const basicAuth = require("express-basic-auth");
// const socialRoutes = require("@colyseus/social/express").default;

const MyRoom = require("./rooms/MyRoom").MyRoom;

const port = process.env.PORT || 2567;
const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new colyseus.Server({
    server: server,
    verifyClient: function (info, next) {
        console.log(`[INFO]: connection from client is ${info.secure ? "secured" : "unsecured"}`);
        next(true);
    },
});

// register your room handlers
gameServer.define("arena", MyRoom);

const basicAuthMiddleware = basicAuth({
    // list of users and passwords
    users: {
        admin: "admin",
    },
    // sends WWW-Authenticate header, which will prompt the user to fill
    // credentials in
    challenge: true,
});

app.use("/colyseus", basicAuthMiddleware, monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
console.log(`Monitor on http://localhost:${port}/colyseus`);
