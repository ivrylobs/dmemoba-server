const schema = require("@colyseus/schema");
const Player = require("./Player").Player;

class State extends schema.Schema {
    constructor() {
        super();
        this.players = new schema.MapSchema();
    }
}

schema.defineTypes(State, {
    players: { map: Player },
});

exports.State = State;
