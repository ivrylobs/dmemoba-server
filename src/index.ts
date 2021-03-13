import http from "http";
import express from "express";
import cors from "cors";
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import basicAuth from "express-basic-auth";

// import socialRoutes from "@colyseus/social/express"

import { MyRoom } from "./rooms/MyRoom";

const port = Number(process.env.PORT || 2567);
const app = express();

const basicAuthMiddleware = basicAuth({
    // list of users and passwords
    users: {
        admin: "admin",
    },
    // sends WWW-Authenticate header, which will prompt the user to fill
    // credentials in
    challenge: true,
});

app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const gameServer = new Server({
    server,
    verifyClient: (info, next) => {
        console.log(`[INFO] ${info.secure ? "secured" : "unsecured"} connection`);
        next(true);
    },
});

// register your room handlers
gameServer.define("arena", MyRoom);

/**
 * Register @colyseus/social routes
 *
 * - uncomment if you want to use default authentication (https://docs.colyseus.io/server/authentication/)
 * - also uncomment the import statement
 */
// app.use("/", socialRoutes);

// register colyseus monitor AFTER registering your room handlers
app.use("/colyseus", basicAuthMiddleware, monitor());

gameServer.listen(port);
console.log(`Listening on ws://localhost:${port}`);
console.log(`Monitoring at http://localhost:${port}/colyseus`);
