import { CompassIcon } from '@modrinth/assets'
import { injectProjectPageContext } from '@modrinth/ui'
import { computed } from 'vue'

import { check, group, markdown, stage, toggle } from '../../types/node'

export default function () {
	const { projectV3: project } = injectProjectPageContext()
	const shop = computed(() => project.value.shop)
	const isStall = computed(() => !!shop.value?.stall)

	return stage('shop-in-game', 'In-game check')
		.hint('Visit the shop and check it against the market rules.')
		.icon(CompassIcon)
		.children(
			() => (
				<div class="markdown-body w-full">
					<strong>Coordinates:</strong>{' '}
					{shop.value?.coordinates
						? `X ${shop.value.coordinates.x}, Z ${shop.value.coordinates.z}`
						: 'None set'}
					<br />
					<strong>Type:</strong> {isStall.value ? 'Stall' : 'Plot shop'}
					{isStall.value && shop.value?.stall_color ? ` (${shop.value.stall_color})` : ''}
				</div>
			),

			check('visited', 'I visited this shop in-game').required(),

			group()
				.title('Problems found?')
				.children(
					toggle('wrong-coordinates', 'Wrong coordinates').suggestedStatus('rejected').message(),
					toggle('not-built', 'Not built or not claimed').suggestedStatus('rejected').message(),
					toggle('wrong-type', 'Wrong type').suggestedStatus('rejected').message(),
					toggle('wrong-stall-color', 'Wrong stall color')
						.shown(isStall)
						.suggestedStatus('rejected')
						.message(),
					toggle('missing-permit', 'Missing permit').suggestedStatus('rejected').message(),
					toggle('no-currency-sign', 'No currency sign').suggestedStatus('rejected').message(),
					toggle('too-many-containers', 'Too many containers')
						.shown(isStall)
						.suggestedStatus('rejected')
						.message(),
					toggle('plot-rule', 'Plot rule broken')
						.shown(computed(() => !isStall.value))
						.suggestedStatus('rejected')
						.message((state) => ({ MESSAGE: state.message }))
						.children(
							markdown('message').title('Which rule is broken, and what needs fixing?').required(),
						),
					toggle('inventory-mismatch', "Doesn't match the inventory")
						.suggestedStatus('rejected')
						.message(),
				),
		)
}
