import { injectProjectPageContext } from '@modrinth/ui'
import type { Ref } from 'vue'

import type { NodeState, StageNode } from '../types/node'
import useCategoriesStage from './stages/categories'
import useDescriptionStage from './stages/description'
import useDisclosuresStage from './stages/disclosures'
import useGalleryStage from './stages/gallery'
import useLicenseStage from './stages/license'
import useLinksStage from './stages/links'
import useMetadataStage from './stages/metadata'
import usePermissionsStage from './stages/permissions'
import usePostApprovalStage from './stages/post-approval'
import useReReviewStage from './stages/re-review'
import useReuploadsStage from './stages/reupload'
import useRulesStage from './stages/rules'
import useShopCategoriesStage from './stages/shop-categories'
import useShopDescriptionStage from './stages/shop-description'
import useShopGalleryStage from './stages/shop-gallery'
import useShopInGameStage from './stages/shop-in-game'
import useShopInventoryStage from './stages/shop-inventory'
import useShopNameStage from './stages/shop-name'
import useShopRulesStage from './stages/shop-rules'
import useShopSummaryStage from './stages/shop-summary'
import useStatusAlertsStage from './stages/status-alerts'
import useSummaryStage from './stages/summary'
import useTitleSlugStage from './stages/title-slug'
import useUndefinedProjectStage from './stages/undefined-project'
import useVersionsStage from './stages/versions'

export function useStages(
	globalState: Ref<Record<string, Record<string, NodeState>>>,
): StageNode[] {
	const { projectV3 } = injectProjectPageContext()
	if (projectV3.value?.shop) {
		const shopStages: StageNode[] = [
			usePostApprovalStage(),
			useReReviewStage(),
			useShopNameStage(),
			useShopSummaryStage(),
			useShopDescriptionStage(),
			useShopGalleryStage(),
			useShopCategoriesStage(),
			useShopInventoryStage(),
			useShopInGameStage(),
			useShopRulesStage(),
		]
		return [...shopStages, useStatusAlertsStage(shopStages, globalState)]
	}

	const mainStages: StageNode[] = [
		usePostApprovalStage(),
		useUndefinedProjectStage(),
		useReReviewStage(),
		useTitleSlugStage(),
		useSummaryStage(),
		useDescriptionStage(),
		useGalleryStage(),
		useDisclosuresStage(),
		useLinksStage(),
		useLicenseStage(),
		useCategoriesStage(),
		useMetadataStage(),
		useVersionsStage(),
		useReuploadsStage(),
		usePermissionsStage(),
		useRulesStage(),
	]
	return [...mainStages, useStatusAlertsStage(mainStages, globalState)]
}
