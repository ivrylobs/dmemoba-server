import { Room, Client } from "colyseus";
import { PlayerData, Quat, State, Vect3 } from "./schema/State";

class PlayerInput {
	position: Vect3;
	rotation: Quat;
}

export class MyRoom extends Room {
	onCreate(options: any) {
		this.setState(new State());
		this.onMessage("input", (client, input) =>
			this.onPlayerMove(client, input)
		);
	}

	onJoin(client: Client, options: any) {
		console.log(`Player ${client.sessionId} connected`);
		const newPlayer: PlayerData = new PlayerData();
		newPlayer.name = client.sessionId;
		this.state.players[client.sessionId] = newPlayer;
	}

	onLeave(client: Client, consented: boolean) {
		if (this.state.players.has(client.sessionId)) {
			this.state.players.delete(client.sessionId);
		}
	}

	onDispose() {
		console.log("last player left, room closing...");
	}

	async onPlayerMove(client: Client, playerInput: PlayerInput) {
		const player: PlayerData = this.state.players[client.sessionId];

		const pos: Vect3 = new Vect3();
		pos.x = playerInput.position.x;
		pos.y = playerInput.position.y;
		pos.z = playerInput.position.z;
		player.position = pos;
		// console.log(
		// 	`Player ${client.sessionId} moved at ${pos.x}, ${pos.y}, ${pos.z}`
		// );

		const rot: Quat = new Quat();
		rot.x = playerInput.rotation.x;
		rot.y = playerInput.rotation.y;
		rot.z = playerInput.rotation.z;
		rot.w = playerInput.rotation.w;
		player.rotation = rot;
		// console.log(
		// 	`Player ${client.sessionId} look at ${rot.x}, ${rot.y}, ${rot.z}, ${rot.w}`
		// );
	}
}
