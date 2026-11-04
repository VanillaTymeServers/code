import { TagsIcon } from '@modrinth/assets'
import { injectProjectPageContext } from '@modrinth/ui'

import { group, stage, toggle } from '../../types/node'
import { arrayOrNone } from '../../utils'

export default function () {
	const { projectV3: project } = injectProjectPageContext()

	return stage('shop-categories', 'Categories')
		.hint('Do the categories match what the shop sells?')
		.icon(TagsIcon)
		.navigate('/settings/tags')
		.children(
			() => (
				<div class="markdown-body w-full">
					<strong>Categories:</strong>{' '}
					{arrayOrNone([...project.value.categories, ...project.value.additional_categories])}
				</div>
			),

			group().children(toggle('inaccurate', 'Inaccurate').suggestedStatus('flagged').message()),
		)
}
