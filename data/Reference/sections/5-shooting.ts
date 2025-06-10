import { Section } from '@/models/reference/section';

export const Section_5: Section = {
	id: 'shooting',
	title: 'Shooting',
	content: `
			<div class="padding1">

			<h1>Shooting</h1>
			<p>For each Shoot action, roll 1d10 + modifiers to hit. Cross off spent ammunition on the character’s sheet.</p>
				<table class="table table-bordered table-striped">
			<tbody >
				<tr>
					<td class="f1 noBorder"><strong>SHORT RANGE</strong></td>
					<td class="f2 noBorder"><strong>6+</strong></td>
				</tr>
				<tr>
					<td class="f1 noBorder"><strong>LONG RANGE</strong></td>
					<td class="f2 noBorder"><strong>8+</strong></td>
				</tr>
				<tr >
					<td class="noBorder"><strong>+1</strong></td>
					<td class="f1 noBorder"><strong>Firer is Aiming</strong></td>
				</tr>
				<tr >
					<td class="noBorder"><strong>-1</strong></td>
					<td class="f1 noBorder"><strong>Firer is Lily Livered</strong></td>
				</tr>
				</tbody>
		</table>
					<p>If a hit is scored, roll on the “Darn, I Been Hit!” table for wound results. If firing at a mounted target, roll again to determine if the horse or the rider is hit (1-5 is the horse, 6-10 is the rider).</p>

			</div>
	 `,
	order: 4,
	page: 1
}