<template>
    <aside class="normal-page__sidebar">
        <div class="rules-content">
            <NavStack
                :items="[
                    {
                        type: 'heading',
                        label: 'On this page',
                    },
                    {
                        label: 'Joining Vanilla Tyme SMP',
                        action: () => scrollToSection('joining'),
                    },
                    {
                        label: 'Safety & Communication',
                        action: () => scrollToSection('safety'),
                    },
                    {
                        label: 'Support & Help',
                        action: () => scrollToSection('support'),
                    },
                    {
                        label: 'Gameplay & Fair Play',
                        action: () => scrollToSection('gameplay'),
                    },
                    {
                        label: 'Spawn',
                        action: () => scrollToSection('spawn'),
                    },
                    {
                        label: 'The End',
                        action: () => scrollToSection('end'),
                    },
                    {
                        label: 'The Nether',
                        action: () => scrollToSection('nether'),
                    },
                    {
                        label: 'Bases',
                        action: () => scrollToSection('bases'),
                    },
                    {
                        label: 'Market & Economy',
                        action: () => scrollToSection('market'),
                    },
                    {
                        label: 'Lag',
                        action: () => scrollToSection('lag'),
                    },
                    {
                        label: 'Inactivity',
                        action: () => scrollToSection('inactivity'),
                    },
                    {
                        label: 'Proof',
                        action: () => scrollToSection('proof'),
                    },
                    {
                        label: 'Punishments',
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
                            <IconUserPlus />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Joining Vanilla Tyme SMP
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >Application process and account
                                requirements</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>Read all of the rules in full before applying.</li>
                    <li>
                        Apply by joining our
                        <a
                            href="https://discord.vanillatymeservers.com"
                            target="_blank"
                            rel="noopener"
                            >Discord</a
                        >
                        server and filling out the application. Players must be
                        approved before playing.
                        <ul>
                            <li>
                                Do not ask staff to review your application.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Incomplete or low effort applications may be denied.
                    </li>
                    <li>
                        Inappropriate Minecraft usernames or skins will not be
                        accepted unless changed.
                    </li>
                    <li>
                        Any player found to have lied on their application prior
                        to, or anytime after being accepted, is subject to an
                        immediate ban.
                    </li>
                    <li>
                        Once accepted, link your Discord (instructions in
                        <a
                            href="https://discord.com/channels/304066050201485322/1026696375087411290"
                            target="_blank"
                            rel="noopener"
                            >link account channel</a
                        >) and remain in our Discord while you play.
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
                            <IconShield />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Safety & Communication
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >How we treat each other in chat and voice</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>
                        No harassment, disrespectful, derogatory, or abusive
                        chat towards anyone, including staff.
                        <ul>
                            <li>No name calling or swearing at others.</li>
                            <li>
                                No excessive or abusive swearing intended to
                                offend, intimidate, or harm.
                            </li>
                            <li>
                                No racist, anti-LGBTQ+, sexist, anti-religious,
                                or otherwise offensive content.
                            </li>
                            <li>No political or religious topics.</li>
                            <li>
                                No arguing in public channels. You may discuss
                                opposing views via DM — but if someone asks you
                                to stop, you must comply.
                            </li>
                            <li>
                                No harmful, violent, or obscene content (NSFW,
                                gore, self harm, drugs, etc.).
                            </li>
                        </ul>
                    </li>
                    <li>
                        No Doxxing. Sharing private/identifying information
                        about another person — name, location, social media — is
                        prohibited.
                    </li>
                    <li>
                        No spam — repetitive, irrelevant, or unsolicited
                        messages.
                    </li>
                    <li>
                        No advertising or self promotion.
                        <ul>
                            <li>
                                Vanilla Tyme content may be shared in our
                                <a
                                    href="https://discord.com/channels/304066050201485322/593543745220378654"
                                    target="_blank"
                                    rel="noopener"
                                    >community content</a
                                >
                                channel.
                            </li>
                            <li>
                                No promoting or mention of other Minecraft
                                servers. (General content creator servers talk
                                is fine.)
                            </li>
                            <li>
                                In-game advertising of goods/services: max once
                                per hour in chat. Prefer the Discord
                                <a
                                    href="https://discord.com/channels/304066050201485322/921765046705598494"
                                    target="_blank"
                                    rel="noopener"
                                    >Buy/Sell/Trade</a
                                >
                                channel.
                            </li>
                            <li>No asking for free items.</li>
                            <li>No sales of items for real currency.</li>
                        </ul>
                    </li>
                    <li>
                        Comply with
                        <a
                            href="https://discord.com/terms"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Discord</a
                        >
                        and
                        <a
                            href="https://minecraft.net/en-us/eula/"
                            target="_blank"
                            rel="noopener noreferrer"
                            >Minecraft</a
                        >
                        EULAs.
                    </li>
                    <li>
                        No alt accounts. One Minecraft + one Discord account per
                        player. Sharing internet with another player? Open a
                        ticket and notify staff.
                    </li>
                    <li>
                        You are responsible for your account. Don't share login.
                        If compromised, contact staff ASAP.
                    </li>
                    <li>
                        English only in public game chat. Other languages
                        allowed in DMs.
                    </li>
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
                            <IconHelpCircle />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Support & Help
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >How to get answers from staff</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>
                        General questions use our
                        <a
                            href="https://discord.com/channels/304066050201485322/304070066633179157"
                            target="_blank"
                            rel="noopener"
                            >community help</a
                        >
                        Discord channel.
                    </li>
                    <li>
                        Specific questions or anything needing staff make a
                        <a
                            href="https://discord.com/channels/304066050201485322/950596143258165288"
                            target="_blank"
                            rel="noopener"
                        >
                            general support ticket</a
                        >
                        in Discord. Tickets get the fastest response.
                    </li>
                    <li>
                        Don't DM individual staff. Exception: if your issue is
                        with a staff member, contact a developer directly.
                    </li>
                    <li>
                        Staff in-game may answer straightforward questions, but
                        they may be busy/AFK. If no response, open a
                        <a
                            href="https://discord.com/channels/304066050201485322/950596143258165288"
                            target="_blank"
                            rel="noopener"
                            >ticket</a
                        >.
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
                            <IconTool />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Gameplay & Fair Play
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >No hacks, no cheats, no exploits — play
                                fairly</span
                            >
                        </div>
                    </div>
                </template>
                <MessageBanner class="mx-4">
                    <span class="font-bold text-brand">Heads up:</span> all
                    player actions are logged. Getting caught is unavoidable.
                </MessageBanner>
                <ol class="mx-4">
                    <li>
                        No cheats, hacks, or exploits.
                        <ul>
                            <li>
                                No in-game bugs, glitches, or exploits.
                                Exception: breaking bedrock on nether roof or
                                world base in your own base area with TNT &
                                piston is allowed.
                            </li>
                            <li>
                                No intentional lagging or crashing the server.
                            </li>
                            <li>
                                No item duplication. TNT duplication is allowed.
                            </li>
                            <li>Don't bring items in from outside the game.</li>
                            <li>
                                No scripts, macros, auto-loggers, auto-clickers,
                                auto-miners.
                            </li>
                            <li>
                                No xray (vanilla exploit, mods, resource packs,
                                etc.).
                            </li>
                            <li>
                                No fly hacks, speed hacks, PvP hacks, free
                                camera.
                            </li>
                            <li>
                                Server seed is private. Don't share, request, or
                                use it.
                            </li>
                            <li>
                                No griefing — damaging anything that isn't
                                yours.
                            </li>
                            <li>
                                No stealing. Don't take from bases, chests,
                                farms, or spawn without permission.
                            </li>
                            <li>
                                Don't rearrange items in containers that aren't
                                yours.
                            </li>
                        </ul>
                    </li>
                    <li>
                        Client mods that give an unfair advantage are not
                        allowed. A few exceptions exist — when in doubt, open a
                        ticket.
                    </li>
                    <li>
                        PvP requires consent from all parties. Indirect harm via
                        traps counts.
                    </li>
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
                            <IconCompass />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Spawn
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >750 blocks from x0/z0</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>
                        Spawn extends 750 blocks in all directions from x0/z0.
                        No building, mining, or gathering except in designated
                        areas or with staff approval.
                    </li>
                    <li>
                        Holiday/celebration events with free items: one item per
                        player unless a sign says otherwise. You pick up your
                        own — no picking up for others.
                    </li>
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
                            <IconBeach />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                The End
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >Dragon fights, farms, and the outer
                                islands</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>
                        The first dragon fight and opening of the end is
                        scheduled after the start of each map. No one is allowed
                        to go to the End dimension before this time.
                    </li>
                    <li>
                        No personal Enderman farms. Server provides a public
                        Enderman farm.
                    </li>
                    <li>The dragon may be respawned.</li>
                    <li>
                        Farms and builds of any type are not allowed on the main
                        end island without staff approval. You may build farms
                        in the outer end islands (x/z coords +/- 1000).
                        Temporary beacons are allowed to aide in mining obsidian
                        pillars.
                    </li>
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
                            <IconSpiral />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                The Nether
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >Main tunnels, personal portals, and roof
                                hubs</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>
                        Our main nether tunnels extend north, south, east, and
                        west from 0, 0. Players may not build in or edit the
                        main nether tunnels which extend to approximately +/- 7
                        on each side of 0.
                    </li>
                    <li>
                        Your nether portal must connect to the closest main
                        tunnel and can not have perpendicular side tunnels. If
                        the tunnel you need is already taken, you must contact
                        the person or staff to share the tunnel.
                        <ul>
                            <li>
                                Tunnels cannot exceed the max width and height
                                of 9x9; this includes the walls, floor and roof.
                            </li>
                            <li>
                                Personal nether tunnels and portals must follow
                                the proper size and layout format.
                                <ul>
                                    <li>
                                        Personal portals must be created or
                                        moved to 115 on the y axis in the nether
                                        and must sync properly with your portal
                                        in the Overworld.
                                    </li>
                                    <li>
                                        Personal nether tunnels are spaced every
                                        10 blocks. Your personal tunnel should
                                        end in coordinates 1 and 9. Example:
                                        tunnel goes from 721 to 729
                                    </li>
                                    <li>
                                        The blocks on the 0 cords should be left
                                        as is. Example: Block 720 and 730 are
                                        left netherrack
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </li>
                    <li>
                        Personal portal hubs must be on the nether roof and are
                        restricted to your personal base (750x750 in the
                        overworld).
                    </li>
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
                            <IconHome />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Bases
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >Player claimed areas in the overworld</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>
                        Bases shall not exceed 750 blocks square (750x750) in
                        size.
                    </li>
                    <li>
                        Ensure your base is marked with pillars/signs in each
                        corner or a full border.
                    </li>
                    <li>
                        Do not break or attempt to break another players banner
                        marker
                    </li>
                    <li>
                        Prior to claiming your base, thoroughly scout the area,
                        including caves, to ensure the area isn't already
                        claimed. Use common sense. If there are torches, signs,
                        crops planted, livestock in pens, etc., it's obvious the
                        area is inhabited. If you are in doubt, contact a staff
                        member via support ticket for assistance.
                    </li>
                    <li>
                        Players are allowed to claim structures outside of their
                        main base. You may claim one of any individual type of
                        structure. Examples include an ocean monument, nether
                        fortress, or pillager tower. After claiming clearly with
                        signs, players are expected to use structures within 30
                        days.
                    </li>
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
                            <IconBuildingStore />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Market & Economy
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >Buying, selling, and the spawn market</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>
                        A designated market area is provided at spawn for all
                        players to participate in after approval.
                    </li>
                    <li>
                        Players cannot set up shops, signs, chests, or
                        advertisements in any other part of spawn or public
                        server area without permission or in a predesignated
                        area. This includes the Spawn portion of the nether.
                        This includes the overworld, nether, and main end
                        island. The only exception is within your own market
                        plot/stall.
                    </li>
                    <li>
                        Players are required to read the
                        <NuxtLink to="/rules/market">Market rules</NuxtLink>
                        before starting their own Market Stall or Shop in spawn.
                    </li>
                    <li>
                        Players are allowed to sell items from their base or
                        personal nether tunnel area.
                    </li>
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
                            <IconHeartRateMonitor />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Lag
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >Keeping the server smooth for everyone</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>No chunk loaders of any kind.</li>
                    <li>
                        No bypassing vanilla entity cramming. Stacking minecarts
                        is not allowed.
                    </li>
                    <li>
                        Limit auto-collection (minecarts/hoppers) to as few as
                        possible. Cover hoppers with solid blocks where
                        applicable.
                    </li>
                    <li>
                        No mega item sorters or excessively large redstone
                        builds. Staff may ask you to fix or remove anything
                        causing significant lag.
                    </li>
                    <li>
                        Mob farms must have an on/off switch where possible.
                        <ul>
                            <li>
                                AFKing at hostile mob farms is allowed only when
                                mobs die immediately and don't build up.
                            </li>
                            <li>
                                AFK farms need both an on/off switch and a kill
                                switch.
                            </li>
                            <li>No autoclickers while AFK.</li>
                        </ul>
                    </li>
                    <li>
                        Each base — single player or shared — may have at most
                        100 animals and 100 villagers. Staff may remove mobs
                        over the limit without notice.
                    </li>
                    <li>
                        Villagers:
                        <ul>
                            <li>
                                Breeders must not let over 24 villagers build up
                                at a time.
                            </li>
                            <li>Trading villagers must be optimized.</li>
                        </ul>
                    </li>
                    <li>
                        Guardian farms cannot exceed 20x20x20 (the Guardian
                        spawning area).
                    </li>
                    <li>
                        Staff may disable any farm causing significant lag or
                        otherwise breaking the rules.
                    </li>
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
                            <IconClock />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Inactivity
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >What happens to your base while you're
                                away</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>
                        After 30 days of not logging in, a player with the
                        Member rank is considered inactive. Any base owned by an
                        inactive member rank player is subject for removal,
                        unless staff is notified or a post has been made in the
                        inactivity support ticket. Supporter's bases are safe
                        from inactivity rollback.
                    </li>
                    <li>
                        At no point can another player claim an inactive base or
                        take items from it.
                    </li>
                    <li>
                        Extra claims of structures from any rank player outside
                        of their main base are not safe from inactivity.
                        Examples: nether fortress, ocean monument. If you've
                        claimed a structure and not used it in more than 60
                        days, staff may reclaim it.
                    </li>
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
                            <IconCheck />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Proof
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >Required in your application</span
                            >
                        </div>
                    </div>
                </template>
                <ol class="mx-4">
                    <li>
                        To confirm you've read these rules, include the code
                        <code>#BlameDragon</code> in the Additional Questions
                        section of your application.
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
                            <IconGavel />
                        </div>
                        <div
                            class="title-wrap-section flex min-w-0 flex-col items-start justify-start"
                        >
                            <span
                                class="title-section mb-0.5 text-lg font-bold"
                                style="color: var(--landing-color-heading)"
                            >
                                Punishments
                            </span>
                            <span
                                class="subtitle-section text-sm"
                                style="color: var(--landing-color-subheading)"
                                >What happens when rules are broken</span
                            >
                        </div>
                    </div>
                </template>
                <div class="punish-flow mx-4 mb-4">
                    <div class="punish-step tier-1">
                        <div class="punish-badge">1</div>
                        <div class="punish-text">
                            <div class="punish-name">First Warning</div>
                        </div>
                    </div>
                    <IconChevronRight class="punish-arrow" />
                    <div class="punish-step tier-2">
                        <div class="punish-badge">2</div>
                        <div class="punish-text">
                            <div class="punish-name">Second Warning</div>
                        </div>
                    </div>
                    <IconChevronRight class="punish-arrow" />
                    <div class="punish-step tier-3">
                        <div class="punish-badge">3</div>
                        <div class="punish-text">
                            <div class="punish-name">Third Warning</div>
                            <div class="punish-sub">Final notice</div>
                        </div>
                    </div>
                    <IconChevronRight class="punish-arrow" />
                    <div class="punish-step tier-ban">
                        <div class="punish-badge"><IconGavel /></div>
                        <div class="punish-text">
                            <div class="punish-name">Ban</div>
                            <div class="punish-sub">Permanent</div>
                        </div>
                    </div>
                </div>
                <MessageBanner class="mx-4">
                    <span class="font-bold text-brand"
                        >Not always step-by-step.</span
                    >
                    Serious violations can skip straight to a permanent ban
                    without warning. Every ban may be appealed once — a denied
                    appeal is final.
                </MessageBanner>
                <ol class="mx-4">
                    <li>
                        <strong>Warnings:</strong> after 3 warnings, a player
                        will be banned.
                    </li>
                    <li>
                        <strong>Bans:</strong> may be immediate without warning
                        depending on severity. Bans are permanent but may be
                        appealed once. Denied appeals are final.
                    </li>
                </ol>
            </Accordion>
        </div>
        <div class="rules-cta mt-10">
            <h2 class="rules-cta__title">Ready to apply?</h2>
            <p class="rules-cta__subtitle">
                Now that you've read the rules, hop into our Discord and fill
                out the application to join the SMP.
            </p>
            <ButtonLink type="colored-text" color="brand" size="lg" to="https://discord.vanillatymeservers.com" target="_blank" rel="noopener">
                    Apply on Discord
                    <ChevronRightIcon aria-hidden="true" />
            </ButtonLink>
        </div>
    </div>
</template>

<script lang="ts" setup>
// import {
//     IconBeach,
//     IconBuildingStore,
//     IconCheck,
//     IconChevronRight,
//     IconClock,
//     IconCompass,
//     IconGavel,
//     IconHeartRateMonitor,
//     IconHelpCircle,
//     IconHome,
//     IconShield,
//     IconSpiral,
//     IconTool,
//     IconUserPlus,
// } from "@tabler/icons-vue";

import { ChevronRightIcon } from "@modrinth/assets";
import { Accordion, ButtonLink } from "@modrinth/ui";

// import ButtonStyled from "~/components/modrinth/ui/base/ButtonStyled.vue";
import MessageBanner from "~/components/ui/MessageBanner.vue";
import NavStack from "~/components/ui/NavStack.vue";

function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 16;
    window.scrollTo({ top, behavior: "smooth" });
}

const sectionIds = [
    "joining",
    "safety",
    "support",
    "gameplay",
    "spawn",
    "end",
    "nether",
    "bases",
    "market",
    "lag",
    "inactivity",
    "proof",
    "punishments",
];

const accordions = reactive<Record<string, any>>({});
const accordionRefs = Object.fromEntries(
    sectionIds.map((id) => [
        id,
        (el: any) => {
            if (el) accordions[id] = el;
            else delete accordions[id];
        },
    ]),
);

const anyOpen = computed(() =>
    (Object.values(accordions) as any[]).some((a) => a.isOpen),
);

function toggleAll() {
    const open = !anyOpen.value;
    for (const a of Object.values(accordions) as any[]) {
        open ? a.open() : a.close();
    }
}

const rulesToolbar = inject<{
    toggleAll: (() => void) | null;
    anyOpen: boolean;
} | null>("rulesToolbar", null);

if (rulesToolbar) {
    rulesToolbar.toggleAll = toggleAll;
    watch(anyOpen, (v) => (rulesToolbar.anyOpen = v), { immediate: true });
    onBeforeUnmount(() => {
        if (rulesToolbar.toggleAll === toggleAll) {
            rulesToolbar.toggleAll = null;
            rulesToolbar.anyOpen = false;
        }
    });
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
.icon-section {
    --_bg: var(--color-brand-highlight);
    --_size: 2.5rem;
    --_color: var(--color-brand);
    width: var(--_size);
    height: var(--_size);
    border-radius: calc(16 / 96 * var(--_size));
    color: var(--_color);
    background: var(--_bg);
    display: flex;
    flex-shrink: 0;
    justify-content: center;
    align-items: center;
    svg {
        width: 1.25rem;
        height: 1.25rem;
    }
}
.rule-icon {
    --_size: 2rem;

    border: 1px solid var(--surface-5);
    background-color: var(--color-button-bg);
    object-fit: contain;
    border-radius: calc(16 / 96 * var(--_override-size, var(--_size)));
    position: relative;
    height: var(--_override-size, var(--_size));
    width: var(--_override-size, var(--_size));
    min-height: var(--_override-size, var(--_size));
    min-width: var(--_override-size, var(--_size));

    &.circle {
        border-radius: 50%;
    }

    &:not(.no-shadow) {
        box-shadow: var(--shadow-card);
    }

    &.no-shadow {
        box-shadow: none;
    }

    &.pixelated {
        image-rendering: pixelated;
    }

    &.raised {
        background-color: var(--color-raised-bg);
    }

    &.tint {
        background-color: color-mix(
            in oklch,
            var(--color-button-bg) 100%,
            var(--_tint) 5%
        );
    }
}
ul,
ol {
    @apply marker:text-brand;
}
li {
    line-height: 1.65;
}
ol {
    color: var(--landing-color-subheading);
    li {
        margin-bottom: 0.5rem;
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
    background: color-mix(
        in oklch,
        var(--landing-color-subheading) 5%,
        transparent
    );
    border: 1px solid
        color-mix(in oklch, var(--landing-color-subheading) 12%, transparent);
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
    background: color-mix(
        in oklch,
        var(--landing-color-subheading) 14%,
        transparent
    );
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
.rules-cta {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.75rem;
    padding: 3rem 2rem;
    text-align: center;
    border-radius: 1.25rem;
    border: 1px solid color-mix(in oklch, var(--color-brand) 22%, transparent);
    background: color-mix(in oklch, var(--color-brand) 4%, transparent);
    a {
        text-decoration: none;
    }
}
.rules-cta__title {
    margin: 0;
    font-size: 1.75rem;
    font-weight: 800;
    color: var(--landing-color-heading);
}
.rules-cta__subtitle {
    margin: 0 0 0.75rem;
    max-width: 30rem;
    font-size: 1rem;
    line-height: 1.6;
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
