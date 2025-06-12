import { SpecialRule } from '@/models/specialRuleTemplate'

export const SPEC_RULE_FANFIRE: SpecialRule = {
	specialRuleId: "1",
	name: "Fanfire",
	description: 'Fanfire allows up to 6 rounds to be fired in a single action at short Range, but "10s" are needed to hit.',
	points: 0,
	weaponRule: true,
	alignmentType: [],
	specialityType: [],
}
export const SPEC_RULE_SHOTGUN: SpecialRule = {
	specialRuleId: "2",
	name: "+2 at Close, +1 at Long",
	description: 'At close range, damage is +2, whilst -1 at long range.',
	points: 0,
	weaponRule: true,
	alignmentType: [],
	specialityType: [],
}
export const SPEC_RULE_FREE_RELOAD: SpecialRule = {
	specialRuleId: "2",
	name: "Free Reload",
	description: 'Reloading costs no actions',
	points: 0,
	weaponRule: true,
	alignmentType: [],
	specialityType: [],
}

export const SPEC_RULE_BOWIE_KNIFE: SpecialRule = {
	specialRuleId: '8',
	name: 'Bowie Knife',
	description: 'When defeating an enemy in Fisticuffs, adjust the wound roll up or down one line on the "Darn, I Been Hit" table as desired.\t',
	points: 3,
	alignmentType: ['neutral'],
	specialityType: ['melee', 'brave'],
}
export const SPEC_RULE_COOL_HAND: SpecialRule = {
	specialRuleId: '9',
	name: 'Cool Hand',
	description: 'Ignores first failed Toughness test',
	points: 1,
	maxUsage: 3,
	currentUsage: 0,
	alignmentType: ['neutral'],
	specialityType: ['tough']
}
export const SPEC_RULE_DIRTY_CHEAT: SpecialRule = {
	specialRuleId: '10',
	name: 'Dirty Cheat',
	description: 'Once per turn, pick any card from your hand and swap it with a random card from any other player',
	points: 2,
	alignmentType: ['bandit', 'neutral'],
	specialityType: ['cowardly', 'regular'],
}
export const SPEC_RULE_DRUNK: SpecialRule = {
	specialRuleId: '11',
	name: 'Drunk',
	description: 'May not use "Aim" or "Got You Covered"',
	points: -3,
	alignmentType: ['neutral'],
	specialityType: ['veteran'],
}
export const SPEC_RULE_EXPERT_RIDER: SpecialRule = {
	specialRuleId: '12',
	name: 'Expert Rider',
	description: 'Only -1 to Shooting rolls when mounted, instead of the normal -2 modifier',
	points: 3,
	alignmentType: ['neutral'],
	specialityType: ['veteran', 'ranged'],
}
export const SPEC_RULE_GREENHORN: SpecialRule = {
	specialRuleId: '13',
	name: 'Greenhorn',
	description: '-2 to Shooting rolls',
	points: -3,
	alignmentType: ['neutral'],
	specialityType: ['ranged', 'greenhorn'],
}
export const SPEC_RULE_GUNFIGHTER: SpecialRule = {
	specialRuleId: '14',
	name: 'Gunfighter',
	description: '+1 to Shooting rolls',
	points: 3,
	alignmentType: ['neutral'],
	specialityType: ['ranged', 'veteran'],
}
export const SPEC_RULE_LAW_DOG: SpecialRule = {
	specialRuleId: '16',
	name: 'Law Dog',
	description: 'Cannot Shoot until an enemy fires first',
	points: -2,
	alignmentType: ['lawman'],
	specialityType: ['brave']
}
export const SPEC_RULE_LOUDMOUTH: SpecialRule = {
	specialRuleId: '15',
	name: 'Loudmouth',
	description: '-1 to enemy Toughness tests caused by this character',
	points: 2,
	alignmentType: ['neutral'],
	specialityType: ['veteran', 'greenhorn', 'tough'],
}
export const SPEC_RULE_LUCKY: SpecialRule = {
	specialRuleId: '17',
	name: 'Lucky',
	description: 'Make one free re-roll per game',
	points: 2,
	maxUsage: 1,
	currentUsage: 0,
	alignmentType: ['neutral'],
	specialityType: ['cowardly', 'veteran', 'greenhorn', 'stealthy'],
}
export const SPEC_RULE_MARKSMAN: SpecialRule = {
	specialRuleId: '18',
	name: 'Marksman',
	description: '+1 Shooting to all Long Range shots',
	points: 2,
	alignmentType: ['neutral'],
	specialityType: ['ranged', 'veteran'],
}
export const SPEC_RULE_NERVOUS: SpecialRule = {
	specialRuleId: '19',
	name: 'Nervous',
	description: '-1 to all shooting rolls',
	points: -2,

	alignmentType: ['neutral'],
	specialityType: ['cowardly', 'greenhorn', 'stealthy'],
}
export const SPEC_RULE_OLD_WOUND: SpecialRule = {
	specialRuleId: '20',
	name: 'Old Wound',
	description: 'Start the game with one arm or leg wound already marked',
	points: -2,
	alignmentType: ['neutral'],
	specialityType: ['tough', 'brave', 'veteran'],
}
export const SPEC_RULE_STEALTHY: SpecialRule = {
	specialRuleId: '21',
	name: 'Stealthy',
	description: 'Enemies are -1 to Shoot at him',
	points: 2,
	alignmentType: ['neutral'],
	specialityType: ['stealthy'],
}
export const SPEC_RULE_STUBBORN: SpecialRule = {
	specialRuleId: '24',
	name: 'Stubborn',
	description: 'Ignore any penalty for arm wound',
	points: 2,
	alignmentType: ['neutral'],
	specialityType: ['tough'],
}
export const SPEC_RULE_TOMAHAWK: SpecialRule = {
	specialRuleId: '25',
	name: 'TOMAHAWK',
	description: '+2 in Fisticuffs',
	points: 2,
	alignmentType: ['neutral'],
	specialityType: ['melee', 'brave'],
}
export const SPEC_RULE_ROUGHASNAILS: SpecialRule = {
	specialRuleId: '6',
	name: 'Tough as Nails',
	description: 'Ignore First Wound',
	points: 2,
	maxUsage: 1,
	currentUsage: 0,
	alignmentType: ['neutral'],
	specialityType: ['tough'],
}
export const SPEC_RULE_TRIGGERFINGER: SpecialRule = {
	specialRuleId: '7',
	name: 'Trigger Finger',
	description: '+1 Value to Snap Shot Cards',
	points: 2,
	alignmentType: ['neutral'],
	specialityType: ['ranged'],
}
export const SPEC_RULE_UNPREPARED: SpecialRule = {
	specialRuleId: '21',
	name: 'Unprepared',
	description: 'Cannot Reload',
	points: -3,
	alignmentType: ['neutral'],
	specialityType: [],

}
export const SPEC_RULE_YELLABELLY: SpecialRule = {
	specialRuleId: '22',
	name: 'Yella Belly',
	description: '-1 in Fisticuffs',
	points: -2,
	alignmentType: ['neutral'],
	specialityType: ['cowardly', 'stealthy'],
}

export const SPEC_RULES: SpecialRule[] = [
	SPEC_RULE_FANFIRE,
	SPEC_RULE_SHOTGUN,
	SPEC_RULE_FREE_RELOAD,
	SPEC_RULE_ROUGHASNAILS,
	SPEC_RULE_TRIGGERFINGER,
	SPEC_RULE_BOWIE_KNIFE,
	SPEC_RULE_COOL_HAND,
	SPEC_RULE_DIRTY_CHEAT,
	SPEC_RULE_DRUNK,
	SPEC_RULE_EXPERT_RIDER,
	SPEC_RULE_GREENHORN,
	SPEC_RULE_GUNFIGHTER,
	SPEC_RULE_LAW_DOG,
	SPEC_RULE_LOUDMOUTH,
	SPEC_RULE_LUCKY,
	SPEC_RULE_MARKSMAN,
	SPEC_RULE_NERVOUS,
	SPEC_RULE_STUBBORN,
	SPEC_RULE_UNPREPARED,
]
