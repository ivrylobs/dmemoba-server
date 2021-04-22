import { Schema, type, MapSchema } from "@colyseus/schema";
class Vect3 extends Schema {
    @type("float32")
    x: number = 0;

    @type("float32")
    y: number = 0;

    @type("float32")
    z: number = 0;
}

class Quat extends Schema {
    @type("float32")
    x: number = 0;

    @type("float32")
    y: number = 0;

    @type("float32")
    z: number = 0;

    @type("float32")
    w: number = 1;
}

class EntityData extends Schema {
    @type(Vect3)
    position = new Vect3();

    @type(Quat)
    rotation = new Quat();

    @type("uint8")
    hp = 100;
}

class PlayerData extends EntityData {
    @type("string")
    name: string = null;
}

class State extends Schema {
    @type({ map: PlayerData })
    players = new MapSchema<PlayerData>();
}

export { EntityData, PlayerData, Vect3, Quat, State };
