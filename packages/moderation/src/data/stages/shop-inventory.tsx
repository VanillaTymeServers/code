import { BoxIcon } from '@modrinth/assets'
import { injectProjectPageContext } from '@modrinth/ui'
import { computed } from 'vue'

import { group, stage, toggle } from '../../types/node'

export default function () {
	const { projectV3: project } = injectProjectPageContext()
	const inventory = computed(() => project.value.shop?.inventory ?? [])

	return stage('shop-inventory', 'Inventory')
		.hint("Does the shop's inventory make sense?")
		.icon(BoxIcon)
		.navigate('/inventory')
		.children(
			() => (
				<div class="markdown-body w-full">
					<strong>Items listed:</strong> {inventory.value.length}
				</div>
			),

			group().children(
				toggle('empty', 'Empty').suggestedStatus('rejected').message(),
				toggle('unclear-prices', 'Unclear prices').suggestedStatus('rejected').message(),
				toggle('misleading', 'Misleading listings').suggestedStatus('rejected').message(),
			),
		)
}
