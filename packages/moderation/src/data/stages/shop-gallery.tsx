import { ImageIcon } from '@modrinth/assets'

import { group, stage, toggle } from '../../types/node'

export default function () {
	return stage('shop-gallery', 'Gallery')
		.hint('Do the images show this shop or its items?')
		.icon(ImageIcon)
		.navigate('/gallery')
		.children(
			group().children(
				toggle('not-own', "Not this shop's images").suggestedStatus('rejected').message(),
				toggle('misleading', 'Misleading images').suggestedStatus('flagged').message(),
			),
		)
}
