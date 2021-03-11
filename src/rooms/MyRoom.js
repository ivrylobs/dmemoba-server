const colyseus = require("colyseus");
const State = require("./schema/State").State;

exports.MyRoom = class extends colyseus.Room {
	onCreate(options) {
		this.setState(new State());

		this.onMessage("position", (client, message) => {
			const player = this.state.players.get(client.sessionId);
			player.x = data.x;
			player.y = data.y;
			console.log("Player has moved");
		});

		this.onMessage("players", (client, message) => {
			this.broadcast(this.state.players);
		});
	}

	onJoin(client, options) {
		console.log(client.sessionId);
		this.state.players.set(client.sessionId, new Player());
	}

	onLeave(client, consented) {}

	onDispose() {}
};
