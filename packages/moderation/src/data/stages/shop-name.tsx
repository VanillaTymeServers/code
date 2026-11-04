import { BookOpenIcon } from '@modrinth/assets'
import { injectProjectPageContext } from '@modrinth/ui'

import { group, stage, toggle } from '../../types/node'

export default function () {
	const { projectV3: project } = injectProjectPageContext()

	return stage('shop-name', 'Name and URL')
		.hint("Is the shop's name clear and appropriate?")
		.icon(BookOpenIcon)
		.navigate('/settings')
		.children(
			() => (
				<div class="markdown-body w-full">
					<strong>Name:</strong> <code>{project.value.name}</code>
					<br />
					<strong>URL:</strong> <code>/shop/{project.value.slug}</code>
				</div>
			),

			group().children(
				toggle('extra-text', 'Extra text in name').suggestedStatus('flagged').message(),
				toggle('not-english', 'Not in English').suggestedStatus('rejected').message(),
				toggle('url-mismatch', "URL doesn't match name").suggestedStatus('flagged').message(),
			),
		)
}
