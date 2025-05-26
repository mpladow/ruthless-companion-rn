import { PlayerCharacter } from './playerCharacter';

export interface Posse {
	posseId: string;
	name: string;
	members: PlayerCharacter[];
}