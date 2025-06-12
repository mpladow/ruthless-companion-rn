import { Section } from '@/models/reference/section';

export const Section_7: Section = {
	id: 'weapons',
	title: 'Weapons',
	content: `
			<div class="padding1">

			<h1>Weapons</h1>
			<p>For each Shoot action, roll 1d10 + modifiers to hit. Cross off spent ammunition on the character’s sheet.</p>
			<table class="table table-bordered table-striped">
					<thead>
						<tr class="tableHeader backgroundDark textInverted">
								<th class="red f2 leftAligned">Type</th>
								<th class="red f1 leftAligned">Short</th>
								<th class="red f1 leftAligned">Long</th>
								<th class="red f1 leftAligned">Rounds</th>
								<th class="red f2 leftAligned">Special</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="red f2 leftAligned">Derringer</td>
							<td class="f1">6"</td>
							<td class="f1">-</td>
							<td class="f1">2</td>
							<td class="f2"></td>
						</tr>
						<tr>
							<td class="red f2 leftAligned">Shotgun</td>
							<td class="f1">8"</td> 
							<td class="f1">12"</td>
							<td class="f1">2</td>
							<td class="f2">+2 at close range/ -1 at long range</td>
						</tr>
						<tr>
							<td class="red f2 leftAligned">Revolver</td>
							<td class="f1">8"</td>
							<td class="f1">12"</td>
							<td class="f1">6</td>
							<td class="f2">Fanfire</td>
						</tr>
						<tr>
							<td class="red f2 leftAligned">Buntline Special</td>
							<td class="f1">8"</td>
							<td class="f1">16"</td>
							<td class="f1">6</td>
							<td class="f2">Fanfire</td>
						</tr>
						<tr>
							<td class="red f2 leftAligned">Bow</td>
							<td class="f1">-</td>
							<td class="f1">16"</td>
							<td class="f1">-</td>
							<td class="f2">Free Reload</td>
						</tr>
						<tr>
							<td class="red f2 leftAligned">Repeating Rifle</td>
							<td class="f1">10"</td>
							<td class="f1">24"</td>
							<td class="f1">10</td>
							<td class="f2"></td>
						</tr>
						<tr>
							<td class="red f2 leftAligned">Sharps Carbine</td>
							<td class="f1">18"</td>
							<td class="f1">36"</td>
							<td class="f1">1</td>
							<td class="f2"></td>
						</tr>
					</tbody>
				</table>
					<p>Fanfire allows up to 6 rounds to be fired in a single
action at Short Range, but “10s” are needed to hit.</p>

			</div>
	 `,
	order: 0,
	page: 2
}