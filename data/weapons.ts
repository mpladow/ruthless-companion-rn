import { Weapon } from '@/models/weapon'
import { SPEC_RULE_FANFIRE, SPEC_RULE_FREE_RELOAD, SPEC_RULE_SHOTGUN } from './special_rules'


export const WPN_DERRINGER: Weapon = {
	weaponId: 5,
	name: "Derringer",
	maxAmmunition: 2,
	shortRange: 6,
	longRange: 0,
	specialRules: [],
	weaponTemplateId: 5,
	currentAmmunition: 2
}
export const WPN_SHOTGUN: Weapon = {
	weaponId: 2,
	name: "Shotgun",
	maxAmmunition: 2,
	shortRange: 8,
	longRange: 12,
	specialRules: [SPEC_RULE_SHOTGUN],
	currentAmmunition: 2,
	weaponTemplateId: 2
}
export const WPN_REVOLVER: Weapon = {
	weaponId: 1,
	name: "Revolver",
	maxAmmunition: 6,
	shortRange: 8,
	longRange: 12,
	specialRules: [SPEC_RULE_FANFIRE],
	currentAmmunition: 6,
	weaponTemplateId: 1
}
export const WPN_BUNTLINE_SPECIAL: Weapon = {
	weaponId: 6,
	currentAmmunition: 6,
	shortRange: 8,
	longRange: 0,
	name: "Buntline Special",
	maxAmmunition: 6,
	specialRules: [SPEC_RULE_FANFIRE],
	weaponTemplateId: 0
}
export const WPN_BOW: Weapon = {
	currentAmmunition: 0,
	weaponId: 15,
	name: 'Bow',
	maxAmmunition: 0,
	specialRules: [SPEC_RULE_FREE_RELOAD],
	weaponTemplateId: 0
}
export const WPN_REPEATER: Weapon = {
	weaponId: 3,
	name: "Repeating Rifle",
	maxAmmunition: 10,
	shortRange: 10,
	longRange: 24,
	specialRules: [],
	currentAmmunition: 10,
	weaponTemplateId: 3
}
export const WPN_SHARPS: Weapon = {
	weaponId: 4,
	name: "Sharps Carbine",
	maxAmmunition: 1,
	shortRange: 18,
	longRange: 36,
	specialRules: [],
	currentAmmunition: 1,
	weaponTemplateId: 4
}


//TEMPLATES

// export const WPN_REVOLVER_TEMPLATE: WeaponTemplate = {
// 	weaponId: 1,
// 	name: "Revolver",
// 	maxAmmunition: 6,
// 	shortRange: 8,
// 	longRange: 12,
// 	specialRules: [SPEC_RULE_FANFIRE],
// }
// export const WPN_SHOTGUN_TEMPLATE: WeaponTemplate = {
// 	weaponId: 2,
// 	name: "Shotgun",
// 	maxAmmunition: 2,
// 	shortRange: 8,
// 	longRange: 12,
// 	specialRules: [SPEC_RULE_SHOTGUN],
// }
// export const WPN_REPEATER_TEMPLATE: WeaponTemplate = {
// 	weaponId: 3,
// 	name: "Repeating Rifle",
// 	maxAmmunition: 10,
// 	shortRange: 10,
// 	longRange: 24,
// 	specialRules: [],
// }
// export const WPN_SHARPS_TEMPLATE: WeaponTemplate = {
// 	weaponId: 4,
// 	name: "Sharps Carbine",
// 	maxAmmunition: 1,
// 	shortRange: 18,
// 	longRange: 36,
// 	specialRules: [],
// }


