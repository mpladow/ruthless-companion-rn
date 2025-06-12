import { Section } from '@/models/reference/section';

export const Section_9: Section = {
	id: 'darnivebeenhit',
	title: 'Darn I’ve Been Hit!',
	content: `
			<div class="padding1">

			<h1>Darn I’ve Been Hit!</h1>
				<table class="table table-bordered table-striped">
					<thead>
						<tr class="tableHeader backgroundDark textInverted">
								<th class="red f1 leftAligned">Roll</th>
								<th class="red f1 leftAligned">Location</th>
								<th class="red f2 leftAligned">Result</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td class="red f1 leftAligned">1-2</td>
							<td class="f1">Leg</td>
							<td class="f2">Only one Move per turn</td>
						</tr>
						<tr>
							<td class="red f1 leftAligned">3-4</td>
							<td class="f1">Arm</td>
							<td class="f2">Only one Shoot per turn</td>
						</tr>
						<tr>
							<td class="red f1 leftAligned">5-6</td>
							<td class="f1">Graze</td>
							<td class="f2">No Effect</td>
						</tr>
						<tr>
							<td class="red f1 leftAligned">7</td>
							<td class="f1">Gut Punch</td>
							<td class="f2">No Shooting effect, but Unconscious from Fisticuffs</td>
						</tr>
						<tr>
							<td class="red f1 leftAligned">8-9</td>
							<td class="f1">Chest</td>
							<td class="f2">Cannot Aim</td>
						</tr>
						<tr>
							<td class="red f1 leftAligned">10</td>
							<td class="f1">Severe Wound</td>
							<td class="f2">Knocked Unconscious!</td>
						</tr>
					</tbody>
				</table>
				<p>A character is killed when he crosses off his last hit
				against any single wound location. Horses are killed
				when suffering any combination of three total wounds.</p>
				<p>Tip over a model that is Unconscious. They will recover
				and stand up automatically if the controlling player uses
				an Ace or “4” for initiative on any subsequent turn. This
				card will revive all unconscious models for that player.</p>
			</div>
	 `,
	order: 2,
	page: 2
}