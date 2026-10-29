<template>
	<div class="markdown-body">
		<h1>Content Rules</h1>
		<p><em>Last modified: October 28, 2026</em></p>
		<p>
			These rules apply to everything you publish on the Vanilla Tyme website, such as your profile
			and your shop listings. They are part of our
			<nuxt-link to="/legal/terms">Terms of Use</nuxt-link>.
		</p>

		<h2 id="prohibited-content">1. Prohibited Content</h2>
		<p>
			Anything you put on the website, including your bio, shop names, descriptions and images, must
			not contain:
		</p>
		<ol>
			<li>anything illegal, or anything that encourages illegal activity;</li>
			<li>sexual or sexually suggestive content;</li>
			<li>
				hate speech, slurs, or content that attacks people for their race, ethnicity, religion,
				gender, sexuality, disability or any similar trait;
			</li>
			<li>harassment, threats, bullying or targeting of other players or staff;</li>
			<li>graphic violence, gore, or content that promotes self-harm;</li>
			<li>
				anyone's personal information, such as real names, addresses, phone numbers or photos,
				without their permission;
			</li>
			<li>spam, scams, phishing, or links to malware or suspicious downloads;</li>
			<li>content that copies someone else's work without permission;</li>
			<li>content that pretends to be another player, staff or Vanilla Tyme.</li>
		</ol>

		<h2 id="clear-and-honest-listings">2. Clear and Honest Listings</h2>
		<p>
			Shop pages must clearly and honestly describe the shop in the places meant for it, such as the
			name, summary, description and inventory. Important information must not be hidden or written
			in a confusing way.
		</p>
		<h3 id="general-expectations">2.1. General Expectations</h3>
		<p>From your shop's page, players should be able to tell:</p>
		<ol>
			<li>what you sell, and what you charge for it, including the currency you use;</li>
			<li>where your shop is, so they can find it in game;</li>
			<li>anything else they need to know before they visit or trade.</li>
		</ol>
		<h3 id="readability">2.2. Readability</h3>
		<ol>
			<li>
				Descriptions must be readable as text. Images are welcome, but important information must
				not only be in images.
			</li>
			<li>Shop names, summaries and descriptions must be in English.</li>
		</ol>

		<h2 id="shop-listings">3. Shop Listings</h2>
		<ol>
			<li>Only list a shop you are a member of.</li>
			<li>
				Keep your items, prices and coordinates matching your shop in game, and update them when
				they change.
			</li>
			<li>
				Shop names, descriptions and images must follow
				<a href="#prohibited-content">section 1, Prohibited Content</a>.
			</li>
			<li>Don't advertise other servers or anything outside of Vanilla Tyme.</li>
			<li>Images should show your own shop or items. AI-generated images are allowed.</li>
		</ol>

		<h2 id="miscellaneous">4. Miscellaneous</h2>
		<p>
			These aren't enforced as strictly, but following them makes your shop clearer and easier to
			find.
		</p>
		<ol>
			<li>
				Your shop's name is just its name, without extra text like "BEST PRICES!!" or "cheap".
			</li>
			<li>
				The summary is a short sentence about what you sell, without repeating the shop's name.
			</li>
			<li>Categories, shop type and color are set correctly and match your shop.</li>
			<li>Gallery images are relevant and don't give a wrong impression of what you sell.</li>
			<li>Any links lead to public pages related to your shop.</li>
			<li>Sold-out items are removed or updated, so players don't make a trip for nothing.</li>
		</ol>

		<h2 id="enforcement">5. Enforcement</h2>
		<ol>
			<li>
				Staff can edit, hide or delist any shop listing or profile content that breaks these rules,
				including after a report.
			</li>
			<li>
				Your website account and your place on the server go together, so breaking these rules can
				also lead to a warning or a ban in game, depending on how serious it is.
			</li>
			<li>
				To report a shop or profile, open a ticket in our
				<a href="https://discord.vanillatymeservers.com" target="_blank" rel="noopener">Discord</a>.
			</li>
		</ol>
	</div>
</template>

<script setup>
const description =
	'The rules for content published on the Vanilla Tyme website, such as shop listings and profiles.'

useSeoMeta({
	title: 'Content Rules - Vanilla Tyme',
	description,
	ogTitle: 'Content Rules',
	ogDescription: description,
})
</script>
