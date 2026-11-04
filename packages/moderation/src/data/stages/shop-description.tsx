import { AlignLeftIcon } from '@modrinth/assets'

import { group, stage, toggle } from '../../types/node'

export default function () {
	return stage('shop-description', 'Description')
		.hint('Can players tell what the shop sells and what to expect?')
		.icon(AlignLeftIcon)
		.navigate()
		.children(
			group().children(
				toggle('missing-info', 'Missing information').suggestedStatus('rejected').message(),
				toggle('image-only', 'Information only in images').suggestedStatus('rejected').message(),
				toggle('not-english', 'Not in English').suggestedStatus('rejected').message(),
				toggle('bad-links', 'Unrelated or private links').suggestedStatus('flagged').message(),
			),
		)
}
