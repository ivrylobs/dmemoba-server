import { Schema, MapSchema, type } from "@colyseus/schema";

class Player extends Schema {
    @type("number")
    x: number;

    @type("number")
    y: number;
}

class State extends Schema {
    @type({ map: Player })
    players = new MapSchema<Player>();
}
