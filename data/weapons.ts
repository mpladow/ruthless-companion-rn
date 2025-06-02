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
	currentAmmunition: 2,
	description: "The Derringer is a small, easily concealable pistol, often used as a backup weapon. It typically holds two rounds and is effective at close range, making it a popular choice for discreet self-defense."
}
export const WPN_SHOTGUN: Weapon = {
	weaponId: 2,
	name: "Shotgun",
	maxAmmunition: 2,
	shortRange: 8,
	longRange: 12,
	specialRules: [SPEC_RULE_SHOTGUN],
	currentAmmunition: 2,
	weaponTemplateId: 2,
	description: "Double-barreled shotguns, like the 'coach gun,' were particularly popular, offering versatility for both hunting and self-defense. Single-barreled shotguns, such as the 'Winchester Model 1897 pump action,' were also common, especially among military personnel and law enforcement."
}
export const WPN_REVOLVER: Weapon = {
	weaponId: 1,
	name: "Revolver",
	maxAmmunition: 6,
	shortRange: 8,
	longRange: 12,
	specialRules: [SPEC_RULE_FANFIRE],
	currentAmmunition: 6,
	weaponTemplateId: 1,
	description: "During the American West, several six-shot revolvers were common and well-regarded. The Colt Single Action Army is arguably the most iconic, while others like the Colt 1851 Navy, Remington Army .44, and Colt Walker also gained popularity."
}
export const WPN_BUNTLINE_SPECIAL: Weapon = {
	weaponId: 6,
	currentAmmunition: 6,
	shortRange: 8,
	longRange: 0,
	name: "Buntline Special",
	maxAmmunition: 6,
	specialRules: [SPEC_RULE_FANFIRE],
	weaponTemplateId: 0,
	description: "The Buntline Special is a legendary revolver, often associated with the American West and famous for its long barrel. It was reputedly commissioned by Edward E. Beeman for Wyatt Earp, and its distinctive design made it a favorite among lawmen and outlaws alike."
}
export const WPN_BOW: Weapon = {
	currentAmmunition: 0,
	weaponId: 15,
	name: 'Bow',
	maxAmmunition: 0,
	specialRules: [SPEC_RULE_FREE_RELOAD],
	weaponTemplateId: 0,
	description: "The Bow is a traditional ranged weapon that uses a flexible arc to launch arrows. It is silent and deadly, making it ideal for hunting and stealthy attacks. Bows can vary in size and draw weight, affecting their range and power."
}
export const WPN_REPEATER: Weapon = {
	weaponId: 3,
	name: "Repeating Rifle",
	maxAmmunition: 10,
	shortRange: 10,
	longRange: 24,
	specialRules: [],
	currentAmmunition: 10,
	weaponTemplateId: 3,
	description: "The Repeating Rifle, such as the Winchester Model 1873, was a significant advancement in firearm technology during the American West. It allowed for multiple shots without reloading after each shot, making it a favorite among settlers and lawmen."
}
export const WPN_SHARPS: Weapon = {
	weaponId: 4,
	name: "Sharps Carbine",
	maxAmmunition: 1,
	shortRange: 18,
	longRange: 36,
	specialRules: [],
	currentAmmunition: 1,
	weaponTemplateId: 4,
	description: "The Sharps Carbine was a popular rifle during the American Civil War and the Indian Wars. Known for its accuracy and powerful .52 caliber cartridge, it was favored by both military and civilian marksmen."
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


