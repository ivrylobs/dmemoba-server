import { Room, Client } from "colyseus";
import { PlayerData, Quat, State, Vect3 } from "./schema/State";

class PlayerInput {
    position: Vect3;
    rotation: Quat;
}

export class MyRoom extends Room {
    onCreate(options: any) {
        this.setState(new State());

        this.onMessage("input", (client, input) => this.onPlayerMove(client, input));
    }

    onJoin(client: Client, options: any) {
        console.log(`Player ${client.sessionId} connected`);
        const newPlayer: PlayerData = new PlayerData();
        newPlayer.name = client.sessionId;
        this.state.players[client.sessionId] = newPlayer;
    }

    onLeave(client: Client, consented: boolean) {}

    onDispose() {
        console.log("last player left, room closing...");
    }

    onPlayerMove(client: Client, playerInput: PlayerInput) {
        const player: PlayerData = this.state.players[client.sessionId];
        if (
            playerInput.position.x != player.position.x ||
            playerInput.position.y != player.position.y ||
            playerInput.position.z != player.position.z
        ) {
            const pos: Vect3 = new Vect3();
            pos.x = playerInput.position.x;
            pos.y = playerInput.position.y;
            pos.z = playerInput.position.z;
            player.position = pos;
            console.log(`Player ${client.sessionId} moved at ${pos.x}, ${pos.y}, ${pos.z}`);
        }
    }
}
