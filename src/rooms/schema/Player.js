const schema = require("@colyseus/schema");

class Player extends schema.Schema {
    constructor() {
        super();
        this.x = 0;
        this.y = 0;
    }
}

schema.defineTypes(Player, {
    x: "number",
    y: "number",
});

exports.Player = Player;
