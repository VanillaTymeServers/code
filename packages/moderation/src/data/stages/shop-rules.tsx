import { ListBulletedIcon } from '@modrinth/assets'

import { group, markdown, stage, toggle } from '../../types/node'

export default function () {
	return stage('shop-rules', 'Content rules')
		.hint('Does this shop break the Content Rules?')
		.icon(ListBulletedIcon)
		.navigate('/moderation')
		.children(
			group().children(
				toggle('prohibited', 'Prohibited content')
					.suggestedStatus('rejected')
					.message('prohibited-header')
					.collect()
					.children(
						group()
							.title('Which rule does it break?')
							.children(
								toggle('illegal', 'Illegal').message(),
								toggle('sexual', 'Sexual content').message(),
								toggle('hate', 'Hate speech').message(),
								toggle('harassment', 'Harassment').message(),
								toggle('violence', 'Violence or self-harm').message(),
								toggle('personal-info', 'Personal information').message(),
								toggle('scam', 'Spam or scam').message(),
								toggle('copied', 'Copied work').message(),
								toggle('impersonation', 'Impersonation').message(),
							),
					),
				toggle('not-member', 'Owner is not a member').suggestedStatus('rejected').message(),
				toggle('advertising', 'Advertising').suggestedStatus('rejected').message(),
				toggle('other', 'Other')
					.suggestedStatus('rejected')
					.message((state) => ({ MESSAGE: state.message }))
					.children(markdown('message').title('Explain which rule it breaks.').required()),
			),
		)
}
