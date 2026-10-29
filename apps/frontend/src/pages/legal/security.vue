<template>
	<div class="markdown-body">
		<h1>Security Notice</h1>
		<p><em>Last modified: October 28, 2026</em></p>
		<p>
			This notice explains how to report a security vulnerability in the Vanilla Tyme website. If
			you have found one, we want to hear about it so we can fix it before anyone misuses it.
		</p>

		<h2>Reporting a vulnerability</h2>
		<p>
			Open a ticket in our
			<a href="https://discord.vanillatymeservers.com" target="_blank" rel="noopener">Discord</a>.
			Tickets are only visible to staff.
			<strong>Do not post vulnerabilities in public channels</strong>
			or share them with other players. Please include:
		</p>
		<ul>
			<li>the page or feature where the vulnerability can be found;</li>
			<li>a short description of the vulnerability and what it could let someone do;</li>
			<li>steps to reproduce it that don't harm other players or their data.</li>
		</ul>
		<p>We will reply as soon as we can and let you know when it is fixed.</p>

		<h2>Testing responsibly</h2>
		<ul>
			<li>Only test with your own account. Don't access, change or delete other players' data.</li>
			<li>
				Stop as soon as you have confirmed the issue, and don't keep any data you came across.
			</li>
			<li>Give us a reasonable amount of time to fix the issue before telling anyone else.</li>
		</ul>
		<p>
			If you follow these guidelines and report in good faith, we won't treat your research as a
			break of our <nuxt-link to="/legal/terms">Terms of Use</nuxt-link> or
			<nuxt-link to="/legal/rules">Content Rules</nuxt-link>.
		</p>

		<h2>Out of scope</h2>
		<ul>
			<li>attacks that overwhelm the website with traffic, such as denial of service;</li>
			<li>
				reports that only say something doesn't follow "best practice", such as missing headers;
			</li>
			<li>
				services we don't run, such as Tebex, Discord or Minecraft. Report those to the company that
				runs them.
			</li>
		</ul>
		<p>If you're not sure whether something counts, open a ticket and ask.</p>
	</div>
</template>

<script setup>
const description = 'How to report a security vulnerability in the Vanilla Tyme website.'

useSeoMeta({
	title: 'Security Notice - Vanilla Tyme',
	description,
	ogTitle: 'Security Notice',
	ogDescription: description,
})
</script>
