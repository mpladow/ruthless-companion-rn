import { Section } from '@/models/reference/section';

export const Section_12: Section = {
	id: 'toughness',
	title: 'Toughness',
	content: `
			<div class="padding1">

			<h1>Toughness</h1>
			<p>Characters check to see if they become Lily Livered
every time they or their horse are hit (including Graze
or Gut Punch), or if they see a friendly character killed.</p>

			<p>In either circumstance, a character must roll their
	Toughness value or higher on 1d10. If they fail the test,
	they are marked with a Lily Livered token. Lily Livered
	characters immediately move toward cover and must
	remain in some form of cover until they recover.</p>
	<h3>"Get your courage up!"</h3>

			<p>Characters can recover from being Lily Livered by
starting in cover and taking a “Get Your Courage Up!”
action. Roll 1d10 + the value of any card in your hand.
You are not required to expend a card and any decision
to do so must be made before the roll. If the result is
equal or higher than your Toughness, you are no longer
Lily Livered. Any face card or Ace is a shot of whiskey
and automatically passes the test!</p>
			</div>
	 `,
	order: 6,
	page: 2
}