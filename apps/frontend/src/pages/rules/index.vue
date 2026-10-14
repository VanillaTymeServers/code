<template>
	<aside class="normal-page__sidebar">
		<div class="rules-content">
			<NavStack
				:items="[
					{
						type: 'heading',
						label: formatMessage(messages.onThisPage),
					},
					{
						label: formatMessage(messages.joiningTitle),
						action: () => scrollToSection('joining'),
					},
					{
						label: formatMessage(messages.safetyTitle),
						action: () => scrollToSection('safety'),
					},
					{
						label: formatMessage(messages.supportTitle),
						action: () => scrollToSection('support'),
					},
					{
						label: formatMessage(messages.gameplayTitle),
						action: () => scrollToSection('gameplay'),
					},
					{
						label: formatMessage(messages.spawnTitle),
						action: () => scrollToSection('spawn'),
					},
					{
						label: formatMessage(messages.endTitle),
						action: () => scrollToSection('end'),
					},
					{
						label: formatMessage(messages.netherTitle),
						action: () => scrollToSection('nether'),
					},
					{
						label: formatMessage(messages.basesTitle),
						action: () => scrollToSection('bases'),
					},
					{
						label: formatMessage(messages.marketTitle),
						action: () => scrollToSection('market'),
					},
					{
						label: formatMessage(messages.lagTitle),
						action: () => scrollToSection('lag'),
					},
					{
						label: formatMessage(messages.inactivityTitle),
						action: () => scrollToSection('inactivity'),
					},
					{
						label: formatMessage(messages.proofTitle),
						action: () => scrollToSection('proof'),
					},
					{
						label: formatMessage(messages.punishmentsTitle),
						action: () => scrollToSection('punishments'),
					},
				]"
			/>
		</div>
	</aside>
	<div class="normal-page__content mt-3 lg:mt-0">
		<div class="flex flex-col gap-3">
			<Accordion
				id="joining"
				:ref="accordionRefs.joining"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<UserPlusIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.joiningTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.joiningSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.joiningReadRules) }}</li>
					<li>
						<IntlFormatted :message-id="messages.joiningApply">
							<template #discord-link="{ children }">
								<a href="https://discord.vanillatymeservers.com" target="_blank" rel="noopener">
									<component :is="() => normalizeChildren(children)" />
								</a>
							</template>
						</IntlFormatted>
						<ul>
							<li>{{ formatMessage(messages.joiningNoReviewRequests) }}</li>
						</ul>
					</li>
					<li>{{ formatMessage(messages.joiningLowEffort) }}</li>
					<li>{{ formatMessage(messages.joiningUsernames) }}</li>
					<li>{{ formatMessage(messages.joiningLying) }}</li>
					<li>
						<IntlFormatted :message-id="messages.joiningLinkAccount">
							<template #link-account-link="{ children }">
								<a
									href="https://discord.com/channels/304066050201485322/1026696375087411290"
									target="_blank"
									rel="noopener"
								>
									<component :is="() => normalizeChildren(children)" />
								</a>
							</template>
						</IntlFormatted>
					</li>
				</ol>
			</Accordion>
			<Accordion
				id="safety"
				:ref="accordionRefs.safety"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<ShieldIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.safetyTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.safetySubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>
						{{ formatMessage(messages.safetyNoHarassment) }}
						<ul>
							<li>{{ formatMessage(messages.safetyNoNameCalling) }}</li>
							<li>{{ formatMessage(messages.safetyNoExcessiveSwearing) }}</li>
							<li>{{ formatMessage(messages.safetyNoOffensiveContent) }}</li>
							<li>{{ formatMessage(messages.safetyNoPolitics) }}</li>
							<li>{{ formatMessage(messages.safetyNoArguing) }}</li>
							<li>{{ formatMessage(messages.safetyNoHarmfulContent) }}</li>
						</ul>
					</li>
					<li>{{ formatMessage(messages.safetyNoDoxxing) }}</li>
					<li>{{ formatMessage(messages.safetyNoSpam) }}</li>
					<li>
						{{ formatMessage(messages.safetyNoAdvertising) }}
						<ul>
							<li>
								<IntlFormatted :message-id="messages.safetyCommunityContent">
									<template #community-content-link="{ children }">
										<a
											href="https://discord.com/channels/304066050201485322/593543745220378654"
											target="_blank"
											rel="noopener"
										>
											<component :is="() => normalizeChildren(children)" />
										</a>
									</template>
								</IntlFormatted>
							</li>
							<li>{{ formatMessage(messages.safetyNoOtherServers) }}</li>
							<li>
								<IntlFormatted :message-id="messages.safetyInGameAdvertising">
									<template #trade-link="{ children }">
										<a
											href="https://discord.com/channels/304066050201485322/921765046705598494"
											target="_blank"
											rel="noopener"
										>
											<component :is="() => normalizeChildren(children)" />
										</a>
									</template>
								</IntlFormatted>
							</li>
							<li>{{ formatMessage(messages.safetyNoFreeItems) }}</li>
							<li>{{ formatMessage(messages.safetyNoRealCurrency) }}</li>
						</ul>
					</li>
					<li>
						<IntlFormatted :message-id="messages.safetyEulas">
							<template #discord-link="{ children }">
								<a href="https://discord.com/terms" target="_blank" rel="noopener noreferrer">
									<component :is="() => normalizeChildren(children)" />
								</a>
							</template>
							<template #minecraft-link="{ children }">
								<a
									href="https://minecraft.net/en-us/eula/"
									target="_blank"
									rel="noopener noreferrer"
								>
									<component :is="() => normalizeChildren(children)" />
								</a>
							</template>
						</IntlFormatted>
					</li>
					<li>{{ formatMessage(messages.safetyNoAltAccounts) }}</li>
					<li>{{ formatMessage(messages.safetyAccountResponsibility) }}</li>
					<li>{{ formatMessage(messages.safetyEnglishOnly) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="support"
				:ref="accordionRefs.support"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<CircleHelpIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.supportTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.supportSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>
						<IntlFormatted :message-id="messages.supportGeneralQuestions">
							<template #community-help-link="{ children }">
								<a
									href="https://discord.com/channels/304066050201485322/304070066633179157"
									target="_blank"
									rel="noopener"
								>
									<component :is="() => normalizeChildren(children)" />
								</a>
							</template>
						</IntlFormatted>
					</li>
					<li>
						<IntlFormatted :message-id="messages.supportTickets">
							<template #ticket-link="{ children }">
								<a
									href="https://discord.com/channels/304066050201485322/950596143258165288"
									target="_blank"
									rel="noopener"
								>
									<component :is="() => normalizeChildren(children)" />
								</a>
							</template>
						</IntlFormatted>
					</li>
					<li>{{ formatMessage(messages.supportNoStaffDms) }}</li>
					<li>
						<IntlFormatted :message-id="messages.supportStaffInGame">
							<template #ticket-link="{ children }">
								<a
									href="https://discord.com/channels/304066050201485322/950596143258165288"
									target="_blank"
									rel="noopener"
								>
									<component :is="() => normalizeChildren(children)" />
								</a>
							</template>
						</IntlFormatted>
					</li>
				</ol>
			</Accordion>
			<Accordion
				id="gameplay"
				:ref="accordionRefs.gameplay"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<WrenchIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.gameplayTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.gameplaySubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<Admonition type="info" class="mx-4 mb-3">
					<IntlFormatted :message-id="messages.gameplayHeadsUp">
						<template #highlight="{ children }">
							<span class="font-bold text-brand">
								<component :is="() => normalizeChildren(children)" />
							</span>
						</template>
					</IntlFormatted>
				</Admonition>
				<ol class="mx-4">
					<li>
						{{ formatMessage(messages.gameplayNoCheats) }}
						<ul>
							<li>{{ formatMessage(messages.gameplayNoBugs) }}</li>
							<li>{{ formatMessage(messages.gameplayNoLagging) }}</li>
							<li>{{ formatMessage(messages.gameplayNoDuplication) }}</li>
							<li>{{ formatMessage(messages.gameplayNoOutsideItems) }}</li>
							<li>{{ formatMessage(messages.gameplayNoScripts) }}</li>
							<li>{{ formatMessage(messages.gameplayNoXray) }}</li>
							<li>{{ formatMessage(messages.gameplayNoHacks) }}</li>
							<li>{{ formatMessage(messages.gameplaySeedPrivate) }}</li>
							<li>{{ formatMessage(messages.gameplayNoGriefing) }}</li>
							<li>{{ formatMessage(messages.gameplayNoStealing) }}</li>
							<li>{{ formatMessage(messages.gameplayNoRearranging) }}</li>
						</ul>
					</li>
					<li>{{ formatMessage(messages.gameplayClientMods) }}</li>
					<li>{{ formatMessage(messages.gameplayPvpConsent) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="spawn"
				:ref="accordionRefs.spawn"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<CompassIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.spawnTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.spawnSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.spawnArea) }}</li>
					<li>{{ formatMessage(messages.spawnEvents) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="end"
				:ref="accordionRefs.end"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<TreePalmIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.endTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.endSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.endFirstDragonFight) }}</li>
					<li>{{ formatMessage(messages.endNoEndermanFarms) }}</li>
					<li>{{ formatMessage(messages.endDragonRespawn) }}</li>
					<li>{{ formatMessage(messages.endBuilds) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="nether"
				:ref="accordionRefs.nether"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<TornadoIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.netherTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.netherSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.netherMainTunnels) }}</li>
					<li>
						{{ formatMessage(messages.netherPortalConnection) }}
						<ul>
							<li>{{ formatMessage(messages.netherTunnelSize) }}</li>
							<li>
								{{ formatMessage(messages.netherTunnelFormat) }}
								<ul>
									<li>{{ formatMessage(messages.netherPortalHeight) }}</li>
									<li>{{ formatMessage(messages.netherTunnelSpacing) }}</li>
									<li>{{ formatMessage(messages.netherZeroCoords) }}</li>
								</ul>
							</li>
						</ul>
					</li>
					<li>{{ formatMessage(messages.netherPortalHubs) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="bases"
				:ref="accordionRefs.bases"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<HomeIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.basesTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.basesSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.basesMaxSize) }}</li>
					<li>{{ formatMessage(messages.basesMarked) }}</li>
					<li>{{ formatMessage(messages.basesBannerMarkers) }}</li>
					<li>{{ formatMessage(messages.basesScoutArea) }}</li>
					<li>{{ formatMessage(messages.basesClaimStructures) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="market"
				:ref="accordionRefs.market"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<StoreIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.marketTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.marketSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.marketArea) }}</li>
					<li>{{ formatMessage(messages.marketNoShopsElsewhere) }}</li>
					<li>
						<IntlFormatted :message-id="messages.marketReadRules">
							<template #market-rules-link="{ children }">
								<NuxtLink to="/rules/market">
									<component :is="() => normalizeChildren(children)" />
								</NuxtLink>
							</template>
						</IntlFormatted>
					</li>
					<li>{{ formatMessage(messages.marketSellFromBase) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="lag"
				:ref="accordionRefs.lag"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<HeartPulseIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.lagTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.lagSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.lagNoChunkLoaders) }}</li>
					<li>{{ formatMessage(messages.lagNoEntityCramming) }}</li>
					<li>{{ formatMessage(messages.lagAutoCollection) }}</li>
					<li>{{ formatMessage(messages.lagNoMegaSorters) }}</li>
					<li>
						{{ formatMessage(messages.lagMobFarmSwitch) }}
						<ul>
							<li>{{ formatMessage(messages.lagAfkHostileFarms) }}</li>
							<li>{{ formatMessage(messages.lagAfkFarmSwitches) }}</li>
							<li>{{ formatMessage(messages.lagNoAfkAutoclickers) }}</li>
						</ul>
					</li>
					<li>{{ formatMessage(messages.lagMobLimit) }}</li>
					<li>
						{{ formatMessage(messages.lagVillagers) }}
						<ul>
							<li>{{ formatMessage(messages.lagVillagerBreeders) }}</li>
							<li>{{ formatMessage(messages.lagTradingVillagers) }}</li>
						</ul>
					</li>
					<li>{{ formatMessage(messages.lagGuardianFarms) }}</li>
					<li>{{ formatMessage(messages.lagStaffMayDisable) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="inactivity"
				:ref="accordionRefs.inactivity"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<ClockIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.inactivityTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.inactivitySubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>{{ formatMessage(messages.inactivityMemberRank) }}</li>
					<li>{{ formatMessage(messages.inactivityNoClaiming) }}</li>
					<li>{{ formatMessage(messages.inactivityStructureClaims) }}</li>
				</ol>
			</Accordion>
			<Accordion
				id="proof"
				:ref="accordionRefs.proof"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<CheckIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.proofTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.proofSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<ol class="mx-4">
					<li>
						<IntlFormatted :message-id="messages.proofCode">
							<template #code="{ children }">
								<code><component :is="() => normalizeChildren(children)" /></code>
							</template>
						</IntlFormatted>
					</li>
				</ol>
			</Accordion>
			<Accordion
				id="punishments"
				:ref="accordionRefs.punishments"
				button-class="button-animation flex flex-col gap-1 px-6 py-5 w-full bg-transparent cursor-pointer border-none"
				title-wrapper-class="flex flex-col gap-2 justify-start items-start"
				content-class="mb-4 mx-3"
				class="rounded-2xl bg-bg-raised"
				open-by-default
			>
				<template #title>
					<div class="flex w-full items-center gap-4">
						<div class="icon-section">
							<GavelIcon />
						</div>
						<div class="title-wrap-section flex min-w-0 flex-col items-start justify-start">
							<span
								class="title-section mb-0.5 text-lg font-bold"
								style="color: var(--landing-color-heading)"
							>
								{{ formatMessage(messages.punishmentsTitle) }}
							</span>
							<span class="subtitle-section text-sm" style="color: var(--landing-color-subheading)">
								{{ formatMessage(messages.punishmentsSubtitle) }}
							</span>
						</div>
					</div>
				</template>
				<div class="punish-flow mx-4 mb-4">
					<div class="punish-step tier-1">
						<div class="punish-badge">1</div>
						<div class="punish-text">
							<div class="punish-name">{{ formatMessage(messages.punishmentsFirstWarning) }}</div>
						</div>
					</div>
					<ChevronRightIcon class="punish-arrow" />
					<div class="punish-step tier-2">
						<div class="punish-badge">2</div>
						<div class="punish-text">
							<div class="punish-name">{{ formatMessage(messages.punishmentsSecondWarning) }}</div>
						</div>
					</div>
					<ChevronRightIcon class="punish-arrow" />
					<div class="punish-step tier-3">
						<div class="punish-badge">3</div>
						<div class="punish-text">
							<div class="punish-name">{{ formatMessage(messages.punishmentsThirdWarning) }}</div>
							<div class="punish-sub">{{ formatMessage(messages.punishmentsFinalNotice) }}</div>
						</div>
					</div>
					<ChevronRightIcon class="punish-arrow" />
					<div class="punish-step tier-ban">
						<div class="punish-badge"><GavelIcon /></div>
						<div class="punish-text">
							<div class="punish-name">{{ formatMessage(messages.punishmentsBan) }}</div>
							<div class="punish-sub">{{ formatMessage(messages.punishmentsPermanent) }}</div>
						</div>
					</div>
				</div>
				<Admonition type="info" class="mx-4 mb-3">
					<IntlFormatted :message-id="messages.punishmentsNotStepByStep">
						<template #highlight="{ children }">
							<span class="font-bold text-brand">
								<component :is="() => normalizeChildren(children)" />
							</span>
						</template>
					</IntlFormatted>
				</Admonition>
				<ol class="mx-4">
					<li>
						<IntlFormatted :message-id="messages.punishmentsWarnings">
							<template #strong="{ children }">
								<strong><component :is="() => normalizeChildren(children)" /></strong>
							</template>
						</IntlFormatted>
					</li>
					<li>
						<IntlFormatted :message-id="messages.punishmentsBans">
							<template #strong="{ children }">
								<strong><component :is="() => normalizeChildren(children)" /></strong>
							</template>
						</IntlFormatted>
					</li>
				</ol>
			</Accordion>
		</div>
		<div class="rules-cta mt-10">
			<h2 class="rules-cta__title">{{ formatMessage(messages.ctaTitle) }}</h2>
			<p class="rules-cta__subtitle">
				{{ formatMessage(messages.ctaDescription) }}
			</p>
			<ButtonLink
				type="colored-text"
				color="brand"
				size="lg"
				href="https://discord.vanillatymeservers.com"
				target="_blank"
				rel="noopener"
			>
				{{ formatMessage(messages.ctaButton) }}
				<ChevronRightIcon aria-hidden="true" />
			</ButtonLink>
		</div>
	</div>
</template>

<script lang="ts" setup>
import {
	CheckIcon,
	ChevronRightIcon,
	CircleHelpIcon,
	ClockIcon,
	CompassIcon,
	GavelIcon,
	HeartPulseIcon,
	HomeIcon,
	ShieldIcon,
	StoreIcon,
	TornadoIcon,
	TreePalmIcon,
	UserPlusIcon,
	WrenchIcon,
} from '@modrinth/assets'
import {
	Accordion,
	Admonition,
	ButtonLink,
	defineMessages,
	IntlFormatted,
	normalizeChildren,
	useVIntl,
} from '@modrinth/ui'

import NavStack from '~/components/ui/NavStack.vue'

const { formatMessage } = useVIntl()

const messages = defineMessages({
	onThisPage: {
		id: 'rules.on-this-page',
		defaultMessage: 'On this page',
	},
	joiningTitle: {
		id: 'rules.main.joining.title',
		defaultMessage: 'Joining Vanilla Tyme SMP',
	},
	joiningSubtitle: {
		id: 'rules.main.joining.subtitle',
		defaultMessage: 'Application process and account requirements',
	},
	joiningReadRules: {
		id: 'rules.main.joining.read-rules',
		defaultMessage: 'Read all of the rules in full before applying.',
	},
	joiningApply: {
		id: 'rules.main.joining.apply',
		defaultMessage:
			'Apply by joining our <discord-link>Discord</discord-link> server and filling out the application. Players must be approved before playing.',
	},
	joiningNoReviewRequests: {
		id: 'rules.main.joining.no-review-requests',
		defaultMessage: 'Do not ask staff to review your application.',
	},
	joiningLowEffort: {
		id: 'rules.main.joining.low-effort',
		defaultMessage: 'Incomplete or low effort applications may be denied.',
	},
	joiningUsernames: {
		id: 'rules.main.joining.usernames',
		defaultMessage:
			'Inappropriate Minecraft usernames or skins will not be accepted unless changed.',
	},
	joiningLying: {
		id: 'rules.main.joining.lying',
		defaultMessage:
			'Any player found to have lied on their application prior to, or anytime after being accepted, is subject to an immediate ban.',
	},
	joiningLinkAccount: {
		id: 'rules.main.joining.link-account',
		defaultMessage:
			'Once accepted, link your Discord (instructions in <link-account-link>link account channel</link-account-link>) and remain in our Discord while you play.',
	},
	safetyTitle: {
		id: 'rules.main.safety.title',
		defaultMessage: 'Safety & Communication',
	},
	safetySubtitle: {
		id: 'rules.main.safety.subtitle',
		defaultMessage: 'How we treat each other in chat and voice',
	},
	safetyNoHarassment: {
		id: 'rules.main.safety.no-harassment',
		defaultMessage:
			'No harassment, disrespectful, derogatory, or abusive chat towards anyone, including staff.',
	},
	safetyNoNameCalling: {
		id: 'rules.main.safety.no-name-calling',
		defaultMessage: 'No name calling or swearing at others.',
	},
	safetyNoExcessiveSwearing: {
		id: 'rules.main.safety.no-excessive-swearing',
		defaultMessage: 'No excessive or abusive swearing intended to offend, intimidate, or harm.',
	},
	safetyNoOffensiveContent: {
		id: 'rules.main.safety.no-offensive-content',
		defaultMessage:
			'No racist, anti-LGBTQ+, sexist, anti-religious, or otherwise offensive content.',
	},
	safetyNoPolitics: {
		id: 'rules.main.safety.no-politics',
		defaultMessage: 'No political or religious topics.',
	},
	safetyNoArguing: {
		id: 'rules.main.safety.no-arguing',
		defaultMessage:
			'No arguing in public channels. You may discuss opposing views via DM — but if someone asks you to stop, you must comply.',
	},
	safetyNoHarmfulContent: {
		id: 'rules.main.safety.no-harmful-content',
		defaultMessage: 'No harmful, violent, or obscene content (NSFW, gore, self harm, drugs, etc.).',
	},
	safetyNoDoxxing: {
		id: 'rules.main.safety.no-doxxing',
		defaultMessage:
			'No Doxxing. Sharing private/identifying information about another person — name, location, social media — is prohibited.',
	},
	safetyNoSpam: {
		id: 'rules.main.safety.no-spam',
		defaultMessage: 'No spam — repetitive, irrelevant, or unsolicited messages.',
	},
	safetyNoAdvertising: {
		id: 'rules.main.safety.no-advertising',
		defaultMessage: 'No advertising or self promotion.',
	},
	safetyCommunityContent: {
		id: 'rules.main.safety.community-content',
		defaultMessage:
			'Vanilla Tyme content may be shared in our <community-content-link>community content</community-content-link> channel.',
	},
	safetyNoOtherServers: {
		id: 'rules.main.safety.no-other-servers',
		defaultMessage:
			'No promoting or mention of other Minecraft servers. (General content creator servers talk is fine.)',
	},
	safetyInGameAdvertising: {
		id: 'rules.main.safety.in-game-advertising',
		defaultMessage:
			'In-game advertising of goods/services: max once per hour in chat. Prefer the Discord <trade-link>Buy/Sell/Trade</trade-link> channel.',
	},
	safetyNoFreeItems: {
		id: 'rules.main.safety.no-free-items',
		defaultMessage: 'No asking for free items.',
	},
	safetyNoRealCurrency: {
		id: 'rules.main.safety.no-real-currency',
		defaultMessage: 'No sales of items for real currency.',
	},
	safetyEulas: {
		id: 'rules.main.safety.eulas',
		defaultMessage:
			'Comply with <discord-link>Discord</discord-link> and <minecraft-link>Minecraft</minecraft-link> EULAs.',
	},
	safetyNoAltAccounts: {
		id: 'rules.main.safety.no-alt-accounts',
		defaultMessage:
			'No alt accounts. One Minecraft + one Discord account per player. Sharing internet with another player? Open a ticket and notify staff.',
	},
	safetyAccountResponsibility: {
		id: 'rules.main.safety.account-responsibility',
		defaultMessage:
			"You are responsible for your account. Don't share login. If compromised, contact staff ASAP.",
	},
	safetyEnglishOnly: {
		id: 'rules.main.safety.english-only',
		defaultMessage: 'English only in public game chat. Other languages allowed in DMs.',
	},
	supportTitle: {
		id: 'rules.main.support.title',
		defaultMessage: 'Support & Help',
	},
	supportSubtitle: {
		id: 'rules.main.support.subtitle',
		defaultMessage: 'How to get answers from staff',
	},
	supportGeneralQuestions: {
		id: 'rules.main.support.general-questions',
		defaultMessage:
			'General questions use our <community-help-link>community help</community-help-link> Discord channel.',
	},
	supportTickets: {
		id: 'rules.main.support.tickets',
		defaultMessage:
			'Specific questions or anything needing staff make a <ticket-link>general support ticket</ticket-link> in Discord. Tickets get the fastest response.',
	},
	supportNoStaffDms: {
		id: 'rules.main.support.no-staff-dms',
		defaultMessage:
			"Don't DM individual staff. Exception: if your issue is with a staff member, contact a developer directly.",
	},
	supportStaffInGame: {
		id: 'rules.main.support.staff-in-game',
		defaultMessage:
			'Staff in-game may answer straightforward questions, but they may be busy/AFK. If no response, open a <ticket-link>ticket</ticket-link>.',
	},
	gameplayTitle: {
		id: 'rules.main.gameplay.title',
		defaultMessage: 'Gameplay & Fair Play',
	},
	gameplaySubtitle: {
		id: 'rules.main.gameplay.subtitle',
		defaultMessage: 'No hacks, no cheats, no exploits — play fairly',
	},
	gameplayHeadsUp: {
		id: 'rules.main.gameplay.heads-up',
		defaultMessage:
			'<highlight>Heads up:</highlight> all player actions are logged. Getting caught is unavoidable.',
	},
	gameplayNoCheats: {
		id: 'rules.main.gameplay.no-cheats',
		defaultMessage: 'No cheats, hacks, or exploits.',
	},
	gameplayNoBugs: {
		id: 'rules.main.gameplay.no-bugs',
		defaultMessage:
			'No in-game bugs, glitches, or exploits. Exception: breaking bedrock on nether roof or world base in your own base area with TNT & piston is allowed.',
	},
	gameplayNoLagging: {
		id: 'rules.main.gameplay.no-lagging',
		defaultMessage: 'No intentional lagging or crashing the server.',
	},
	gameplayNoDuplication: {
		id: 'rules.main.gameplay.no-duplication',
		defaultMessage: 'No item duplication. TNT duplication is allowed.',
	},
	gameplayNoOutsideItems: {
		id: 'rules.main.gameplay.no-outside-items',
		defaultMessage: "Don't bring items in from outside the game.",
	},
	gameplayNoScripts: {
		id: 'rules.main.gameplay.no-scripts',
		defaultMessage: 'No scripts, macros, auto-loggers, auto-clickers, auto-miners.',
	},
	gameplayNoXray: {
		id: 'rules.main.gameplay.no-xray',
		defaultMessage: 'No xray (vanilla exploit, mods, resource packs, etc.).',
	},
	gameplayNoHacks: {
		id: 'rules.main.gameplay.no-hacks',
		defaultMessage: 'No fly hacks, speed hacks, PvP hacks, free camera.',
	},
	gameplaySeedPrivate: {
		id: 'rules.main.gameplay.seed-private',
		defaultMessage: "Server seed is private. Don't share, request, or use it.",
	},
	gameplayNoGriefing: {
		id: 'rules.main.gameplay.no-griefing',
		defaultMessage: "No griefing — damaging anything that isn't yours.",
	},
	gameplayNoStealing: {
		id: 'rules.main.gameplay.no-stealing',
		defaultMessage:
			"No stealing. Don't take from bases, chests, farms, or spawn without permission.",
	},
	gameplayNoRearranging: {
		id: 'rules.main.gameplay.no-rearranging',
		defaultMessage: "Don't rearrange items in containers that aren't yours.",
	},
	gameplayClientMods: {
		id: 'rules.main.gameplay.client-mods',
		defaultMessage:
			'Client mods that give an unfair advantage are not allowed. A few exceptions exist — when in doubt, open a ticket.',
	},
	gameplayPvpConsent: {
		id: 'rules.main.gameplay.pvp-consent',
		defaultMessage: 'PvP requires consent from all parties. Indirect harm via traps counts.',
	},
	spawnTitle: {
		id: 'rules.main.spawn.title',
		defaultMessage: 'Spawn',
	},
	spawnSubtitle: {
		id: 'rules.main.spawn.subtitle',
		defaultMessage: '750 blocks from x0/z0',
	},
	spawnArea: {
		id: 'rules.main.spawn.area',
		defaultMessage:
			'Spawn extends 750 blocks in all directions from x0/z0. No building, mining, or gathering except in designated areas or with staff approval.',
	},
	spawnEvents: {
		id: 'rules.main.spawn.events',
		defaultMessage:
			'Holiday/celebration events with free items: one item per player unless a sign says otherwise. You pick up your own — no picking up for others.',
	},
	endTitle: {
		id: 'rules.main.end.title',
		defaultMessage: 'The End',
	},
	endSubtitle: {
		id: 'rules.main.end.subtitle',
		defaultMessage: 'Dragon fights, farms, and the outer islands',
	},
	endFirstDragonFight: {
		id: 'rules.main.end.first-dragon-fight',
		defaultMessage:
			'The first dragon fight and opening of the end is scheduled after the start of each map. No one is allowed to go to the End dimension before this time.',
	},
	endNoEndermanFarms: {
		id: 'rules.main.end.no-enderman-farms',
		defaultMessage: 'No personal Enderman farms. Server provides a public Enderman farm.',
	},
	endDragonRespawn: {
		id: 'rules.main.end.dragon-respawn',
		defaultMessage: 'The dragon may be respawned.',
	},
	endBuilds: {
		id: 'rules.main.end.builds',
		defaultMessage:
			'Farms and builds of any type are not allowed on the main end island without staff approval. You may build farms in the outer end islands (x/z coords +/- 1000). Temporary beacons are allowed to aide in mining obsidian pillars.',
	},
	netherTitle: {
		id: 'rules.main.nether.title',
		defaultMessage: 'The Nether',
	},
	netherSubtitle: {
		id: 'rules.main.nether.subtitle',
		defaultMessage: 'Main tunnels, personal portals, and roof hubs',
	},
	netherMainTunnels: {
		id: 'rules.main.nether.main-tunnels',
		defaultMessage:
			'Our main nether tunnels extend north, south, east, and west from 0, 0. Players may not build in or edit the main nether tunnels which extend to approximately +/- 7 on each side of 0.',
	},
	netherPortalConnection: {
		id: 'rules.main.nether.portal-connection',
		defaultMessage:
			'Your nether portal must connect to the closest main tunnel and can not have perpendicular side tunnels. If the tunnel you need is already taken, you must contact the person or staff to share the tunnel.',
	},
	netherTunnelSize: {
		id: 'rules.main.nether.tunnel-size',
		defaultMessage:
			'Tunnels cannot exceed the max width and height of 9x9; this includes the walls, floor and roof.',
	},
	netherTunnelFormat: {
		id: 'rules.main.nether.tunnel-format',
		defaultMessage:
			'Personal nether tunnels and portals must follow the proper size and layout format.',
	},
	netherPortalHeight: {
		id: 'rules.main.nether.portal-height',
		defaultMessage:
			'Personal portals must be created or moved to 115 on the y axis in the nether and must sync properly with your portal in the Overworld.',
	},
	netherTunnelSpacing: {
		id: 'rules.main.nether.tunnel-spacing',
		defaultMessage:
			'Personal nether tunnels are spaced every 10 blocks. Your personal tunnel should end in coordinates 1 and 9. Example: tunnel goes from 721 to 729',
	},
	netherZeroCoords: {
		id: 'rules.main.nether.zero-coords',
		defaultMessage:
			'The blocks on the 0 cords should be left as is. Example: Block 720 and 730 are left netherrack',
	},
	netherPortalHubs: {
		id: 'rules.main.nether.portal-hubs',
		defaultMessage:
			'Personal portal hubs must be on the nether roof and are restricted to your personal base (750x750 in the overworld).',
	},
	basesTitle: {
		id: 'rules.main.bases.title',
		defaultMessage: 'Bases',
	},
	basesSubtitle: {
		id: 'rules.main.bases.subtitle',
		defaultMessage: 'Player claimed areas in the overworld',
	},
	basesMaxSize: {
		id: 'rules.main.bases.max-size',
		defaultMessage: 'Bases shall not exceed 750 blocks square (750x750) in size.',
	},
	basesMarked: {
		id: 'rules.main.bases.marked',
		defaultMessage: 'Ensure your base is marked with pillars/signs in each corner or a full border.',
	},
	basesBannerMarkers: {
		id: 'rules.main.bases.banner-markers',
		defaultMessage: 'Do not break or attempt to break another players banner marker',
	},
	basesScoutArea: {
		id: 'rules.main.bases.scout-area',
		defaultMessage:
			"Prior to claiming your base, thoroughly scout the area, including caves, to ensure the area isn't already claimed. Use common sense. If there are torches, signs, crops planted, livestock in pens, etc., it's obvious the area is inhabited. If you are in doubt, contact a staff member via support ticket for assistance.",
	},
	basesClaimStructures: {
		id: 'rules.main.bases.claim-structures',
		defaultMessage:
			'Players are allowed to claim structures outside of their main base. You may claim one of any individual type of structure. Examples include an ocean monument, nether fortress, or pillager tower. After claiming clearly with signs, players are expected to use structures within 30 days.',
	},
	marketTitle: {
		id: 'rules.main.market.title',
		defaultMessage: 'Market & Economy',
	},
	marketSubtitle: {
		id: 'rules.main.market.subtitle',
		defaultMessage: 'Buying, selling, and the spawn market',
	},
	marketArea: {
		id: 'rules.main.market.area',
		defaultMessage:
			'A designated market area is provided at spawn for all players to participate in after approval.',
	},
	marketNoShopsElsewhere: {
		id: 'rules.main.market.no-shops-elsewhere',
		defaultMessage:
			'Players cannot set up shops, signs, chests, or advertisements in any other part of spawn or public server area without permission or in a predesignated area. This includes the Spawn portion of the nether. This includes the overworld, nether, and main end island. The only exception is within your own market plot/stall.',
	},
	marketReadRules: {
		id: 'rules.main.market.read-rules',
		defaultMessage:
			'Players are required to read the <market-rules-link>Market rules</market-rules-link> before starting their own Market Stall or Shop in spawn.',
	},
	marketSellFromBase: {
		id: 'rules.main.market.sell-from-base',
		defaultMessage:
			'Players are allowed to sell items from their base or personal nether tunnel area.',
	},
	lagTitle: {
		id: 'rules.main.lag.title',
		defaultMessage: 'Lag',
	},
	lagSubtitle: {
		id: 'rules.main.lag.subtitle',
		defaultMessage: 'Keeping the server smooth for everyone',
	},
	lagNoChunkLoaders: {
		id: 'rules.main.lag.no-chunk-loaders',
		defaultMessage: 'No chunk loaders of any kind.',
	},
	lagNoEntityCramming: {
		id: 'rules.main.lag.no-entity-cramming',
		defaultMessage: 'No bypassing vanilla entity cramming. Stacking minecarts is not allowed.',
	},
	lagAutoCollection: {
		id: 'rules.main.lag.auto-collection',
		defaultMessage:
			'Limit auto-collection (minecarts/hoppers) to as few as possible. Cover hoppers with solid blocks where applicable.',
	},
	lagNoMegaSorters: {
		id: 'rules.main.lag.no-mega-sorters',
		defaultMessage:
			'No mega item sorters or excessively large redstone builds. Staff may ask you to fix or remove anything causing significant lag.',
	},
	lagMobFarmSwitch: {
		id: 'rules.main.lag.mob-farm-switch',
		defaultMessage: 'Mob farms must have an on/off switch where possible.',
	},
	lagAfkHostileFarms: {
		id: 'rules.main.lag.afk-hostile-farms',
		defaultMessage:
			"AFKing at hostile mob farms is allowed only when mobs die immediately and don't build up.",
	},
	lagAfkFarmSwitches: {
		id: 'rules.main.lag.afk-farm-switches',
		defaultMessage: 'AFK farms need both an on/off switch and a kill switch.',
	},
	lagNoAfkAutoclickers: {
		id: 'rules.main.lag.no-afk-autoclickers',
		defaultMessage: 'No autoclickers while AFK.',
	},
	lagMobLimit: {
		id: 'rules.main.lag.mob-limit',
		defaultMessage:
			'Each base — single player or shared — may have at most 100 animals and 100 villagers. Staff may remove mobs over the limit without notice.',
	},
	lagVillagers: {
		id: 'rules.main.lag.villagers',
		defaultMessage: 'Villagers:',
	},
	lagVillagerBreeders: {
		id: 'rules.main.lag.villager-breeders',
		defaultMessage: 'Breeders must not let over 24 villagers build up at a time.',
	},
	lagTradingVillagers: {
		id: 'rules.main.lag.trading-villagers',
		defaultMessage: 'Trading villagers must be optimized.',
	},
	lagGuardianFarms: {
		id: 'rules.main.lag.guardian-farms',
		defaultMessage: 'Guardian farms cannot exceed 20x20x20 (the Guardian spawning area).',
	},
	lagStaffMayDisable: {
		id: 'rules.main.lag.staff-may-disable',
		defaultMessage:
			'Staff may disable any farm causing significant lag or otherwise breaking the rules.',
	},
	inactivityTitle: {
		id: 'rules.main.inactivity.title',
		defaultMessage: 'Inactivity',
	},
	inactivitySubtitle: {
		id: 'rules.main.inactivity.subtitle',
		defaultMessage: "What happens to your base while you're away",
	},
	inactivityMemberRank: {
		id: 'rules.main.inactivity.member-rank',
		defaultMessage:
			"After 30 days of not logging in, a player with the Member rank is considered inactive. Any base owned by an inactive member rank player is subject for removal, unless staff is notified or a post has been made in the inactivity support ticket. Supporter's bases are safe from inactivity rollback.",
	},
	inactivityNoClaiming: {
		id: 'rules.main.inactivity.no-claiming',
		defaultMessage: 'At no point can another player claim an inactive base or take items from it.',
	},
	inactivityStructureClaims: {
		id: 'rules.main.inactivity.structure-claims',
		defaultMessage:
			"Extra claims of structures from any rank player outside of their main base are not safe from inactivity. Examples: nether fortress, ocean monument. If you've claimed a structure and not used it in more than 60 days, staff may reclaim it.",
	},
	proofTitle: {
		id: 'rules.main.proof.title',
		defaultMessage: 'Proof',
	},
	proofSubtitle: {
		id: 'rules.main.proof.subtitle',
		defaultMessage: 'Required in your application',
	},
	proofCode: {
		id: 'rules.main.proof.code',
		defaultMessage:
			"To confirm you've read these rules, include the code <code>#BlameDragon</code> in the Additional Questions section of your application.",
	},
	punishmentsTitle: {
		id: 'rules.main.punishments.title',
		defaultMessage: 'Punishments',
	},
	punishmentsSubtitle: {
		id: 'rules.main.punishments.subtitle',
		defaultMessage: 'What happens when rules are broken',
	},
	punishmentsFirstWarning: {
		id: 'rules.main.punishments.first-warning',
		defaultMessage: 'First Warning',
	},
	punishmentsSecondWarning: {
		id: 'rules.main.punishments.second-warning',
		defaultMessage: 'Second Warning',
	},
	punishmentsThirdWarning: {
		id: 'rules.main.punishments.third-warning',
		defaultMessage: 'Third Warning',
	},
	punishmentsFinalNotice: {
		id: 'rules.main.punishments.final-notice',
		defaultMessage: 'Final notice',
	},
	punishmentsBan: {
		id: 'rules.main.punishments.ban',
		defaultMessage: 'Ban',
	},
	punishmentsPermanent: {
		id: 'rules.main.punishments.permanent',
		defaultMessage: 'Permanent',
	},
	punishmentsNotStepByStep: {
		id: 'rules.main.punishments.not-step-by-step',
		defaultMessage:
			'<highlight>Not always step-by-step.</highlight> Serious violations can skip straight to a permanent ban without warning. Every ban may be appealed once — a denied appeal is final.',
	},
	punishmentsWarnings: {
		id: 'rules.main.punishments.warnings',
		defaultMessage: '<strong>Warnings:</strong> after 3 warnings, a player will be banned.',
	},
	punishmentsBans: {
		id: 'rules.main.punishments.bans',
		defaultMessage:
			'<strong>Bans:</strong> may be immediate without warning depending on severity. Bans are permanent but may be appealed once. Denied appeals are final.',
	},
	ctaTitle: {
		id: 'rules.main.cta.title',
		defaultMessage: 'Ready to apply?',
	},
	ctaDescription: {
		id: 'rules.main.cta.description',
		defaultMessage:
			"Now that you've read the rules, hop into our Discord and fill out the application to join the SMP.",
	},
	ctaButton: {
		id: 'rules.main.cta.button',
		defaultMessage: 'Apply on Discord',
	},
})

function scrollToSection(id: string) {
	const el = document.getElementById(id)
	if (!el) return
	const top = el.getBoundingClientRect().top + window.scrollY - 16
	window.scrollTo({ top, behavior: 'smooth' })
}

const sectionIds = [
	'joining',
	'safety',
	'support',
	'gameplay',
	'spawn',
	'end',
	'nether',
	'bases',
	'market',
	'lag',
	'inactivity',
	'proof',
	'punishments',
]

const accordions = reactive<Record<string, any>>({})
const accordionRefs = Object.fromEntries(
	sectionIds.map((id) => [
		id,
		(el: any) => {
			if (el) accordions[id] = el
			else delete accordions[id]
		},
	]),
)

const anyOpen = computed(() => (Object.values(accordions) as any[]).some((a) => a.isOpen))

function toggleAll() {
	const open = !anyOpen.value
	for (const a of Object.values(accordions) as any[]) {
		open ? a.open() : a.close()
	}
}

const rulesToolbar = inject<{
	toggleAll: (() => void) | null
	anyOpen: boolean
} | null>('rulesToolbar', null)

if (rulesToolbar) {
	rulesToolbar.toggleAll = toggleAll
	watch(anyOpen, (v) => (rulesToolbar.anyOpen = v), { immediate: true })
	onBeforeUnmount(() => {
		if (rulesToolbar.toggleAll === toggleAll) {
			rulesToolbar.toggleAll = null
			rulesToolbar.anyOpen = false
		}
	})
}
</script>

<style lang="scss" scoped>
.normal-page__content li :deep(a) {
	color: var(--color-link);
	text-decoration: underline;

	&:focus-visible,
	&:hover {
		color: var(--color-link-hover);
	}

	&:active {
		color: var(--color-link-active);
	}
}

.punish-flow {
	display: flex;
	align-items: stretch;
	gap: 0.5rem;
	flex-wrap: wrap;
}

.punish-step {
	flex: 1;
	min-width: 110px;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.625rem;
	padding: 1.25rem 0.75rem;
	border-radius: 0.75rem;
	text-align: center;
	background: color-mix(in oklch, var(--landing-color-subheading) 5%, transparent);
	border: 1px solid color-mix(in oklch, var(--landing-color-subheading) 12%, transparent);
}

.punish-badge {
	display: flex;
	flex-shrink: 0;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 2.5rem;
	border-radius: 50%;
	font-size: 1.1rem;
	font-weight: 800;

	svg {
		width: 1.25rem;
		height: 1.25rem;
	}
}

.punish-name {
	font-size: 0.8rem;
	font-weight: 700;
	color: var(--landing-color-heading);
}

.punish-sub {
	font-size: 0.7rem;
	color: var(--landing-color-subheading);
}

.tier-1 .punish-badge {
	background: color-mix(in oklch, var(--landing-color-subheading) 14%, transparent);
	color: var(--landing-color-subheading);
}

.tier-2 .punish-badge {
	background: color-mix(in oklch, var(--color-orange) 15%, transparent);
	color: var(--color-orange);
}

.tier-3 {
	border-color: color-mix(in oklch, var(--color-orange) 30%, transparent);
}

.tier-3 .punish-badge {
	background: color-mix(in oklch, var(--color-orange) 25%, transparent);
	color: var(--color-orange);
}

.tier-ban {
	background: color-mix(in oklch, var(--color-red) 8%, transparent);
	border-color: color-mix(in oklch, var(--color-red) 35%, transparent);
}

.tier-ban .punish-badge {
	background: color-mix(in oklch, var(--color-red) 18%, transparent);
	color: var(--color-red);
}

.tier-ban .punish-name {
	color: var(--color-red);
}

.punish-arrow {
	align-self: center;
	flex-shrink: 0;
	width: 1.1rem;
	height: 1.1rem;
	color: var(--landing-color-subheading);
}

@media (max-width: 600px) {
	.punish-flow {
		flex-direction: column;
	}

	.punish-step {
		flex-direction: row;
		justify-content: flex-start;
		gap: 1rem;
		padding: 0.875rem 1rem;
		text-align: left;
	}

	.punish-arrow {
		transform: rotate(90deg);
	}
}
</style>
