import { Section } from '@/models/reference/section';

export const Section_2: Section = {
	id: 'actions',
	title: 'Actions',
	content: `
	<div class="padding1">
			<h1>Actions</h1>
			<p>When a player has the initiative, each character they control may take two actions. If a “7” card was played for initiative, one character can take three actions! Actions may be taken in any combination, including the same action twice.</p>
		<table class="table table-bordered table-striped">
			<tbody >
				<tr>
					<td class="f1"><strong>Move</strong></td>
					<td class="f1"><strong>Aim</strong></td>
				</tr>
				<tr>
					<td class="f1"><strong>Got you covered!</strong></td>
					<td class="f1"><strong>Shoot</strong></td>
				</tr>
				<tr>
					<td class="f1"><strong>Mount</strong></td>
					<td class="f1"><strong>Reload 3 Shots</strong></td>
				</tr>
				<tr>
					<td class="f1"><strong>Dismount</strong></td>
					<td class="f1"><strong>Get your courage up!</strong></td>
				</tr>
				</tbody>
		</table>
		</div>
	 `,
	order: 1,
	page: 1
}