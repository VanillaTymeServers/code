import { AlignLeftIcon } from '@modrinth/assets'
import { injectProjectPageContext } from '@modrinth/ui'

import { group, stage, toggle } from '../../types/node'

export default function () {
	const { projectV3: project } = injectProjectPageContext()

	return stage('shop-summary', 'Summary')
		.hint('Does the summary say what the shop sells?')
		.icon(AlignLeftIcon)
		.navigate('/settings')
		.children(
			() => (
				<div class="markdown-body w-full">
					<strong>Summary:</strong> <code>{project.value.summary}</code>
				</div>
			),

			group().children(
				toggle('unclear', "Doesn't say what it sells").suggestedStatus('flagged').message(),
				toggle('repeats-name', 'Repeats the name').suggestedStatus('flagged').message(),
				toggle('not-english', 'Not in English').suggestedStatus('rejected').message(),
			),
		)
}
