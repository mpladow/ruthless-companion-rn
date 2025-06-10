import { Section } from '@/models/reference/section';

export const Section_1: Section = {
	id: 'sequence-of-play',
	title: 'Sequence of Play',
	content: `
	<div class="padding1">
			<h1>Sequence of Play</h1>
			<p>At the beginning of a turn, each player is dealt five cards from a standard poker card deck. Choose one card at the beginning of a turn and place it face down on the table. The cards are turned over and revealed simultaneously.</p>
			<p>The highest card goes first, allowing that player to take actions with all of their models. Other players activate in sequence, ending with the lowest card. Ties are decided by suit: <em>Spades, Hearts, Diamonds,</em> and lastly, <em>Clubs</em>.</p>
			<p>The turn ends when all models on the table have taken two actions. If a “3” was played for initiative, that player may choose to discard any number of cards remaining in his hand at the end of the turn. Players end the turn by each replenishing their hand back up to five cards.	</p>
		<p>In addition to determining initiative, cards can also be played throughout the turn to resolve Snap Shots, Get Your Courage Up, and brawling in Fisticuffs. Some cards have special bonuses when played:</p>
		<table class="table table-bordered table-striped">
			<thead>
				<tr>
					<th scope="col" colspan="2" class="tableHeader backgroundDark textInverted"><h3>Special Card Abilities</h3></th>
				</tr>
			</thead>
			<tbody>
				<tr>
					<td class="red f1 leftAligned">A, K, Q, J</td>
					<td class="f2">Automatic “Get Your Courage Up”</td>
				</tr>
				<tr>
					<td class="red f1 leftAligned">7</td>
					<td class="f2">One character may take 3 actions</td>
				</tr>
				<tr>
					<td class="red f1 leftAligned">A or 4</td>
					<td class="f2">Recover from Unconscious</td>
				</tr>
				<tr>
					<td class="red f1 leftAligned">3</td>
					<td class="f2">May discard cards at the end of turn</td>
				</tr>
				<tr>
					<td class="red f1 leftAligned">2</td>
					<td class="f2">“Low Blow” in Fisticuffs</td>
				</tr>
			</tbody>
		</table>
		</div>
	 `,
	order: 0,
	page: 1
}