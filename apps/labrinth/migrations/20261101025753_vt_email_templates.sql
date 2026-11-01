UPDATE notifications_templates
SET body_fetch_url = 'https://vanillatyme.com/_internal/templates/email/' || CASE notification_type
	WHEN 'auth_provider_added' THEN 'auth-method-added'
	WHEN 'auth_provider_removed' THEN 'auth-method-removed'
	WHEN 'email_changed' THEN 'email-changed'
	WHEN 'moderation_message_received' THEN 'moderation-thread-message-received'
	WHEN 'password_changed' THEN 'password-changed'
	WHEN 'password_removed' THEN 'password-removed'
	WHEN 'pat_created' THEN 'personal-access-token-created'
	WHEN 'project_status_approved' THEN 'project-status-approved'
	WHEN 'project_status_neutral' THEN 'project-status-updated-neutral'
	WHEN 'project_transferred' THEN 'project-transferred'
	WHEN 'report_status_updated' THEN 'report-status-updated'
	WHEN 'report_submitted' THEN 'report-submitted'
	WHEN 'reset_password' THEN 'reset-password'
	WHEN 'two_factor_enabled' THEN 'two-factor-added'
	WHEN 'two_factor_removed' THEN 'two-factor-removed'
	WHEN 'verify_email' THEN 'verify-email'
END
WHERE notification_type IN (
	'auth_provider_added', 'auth_provider_removed', 'email_changed',
	'moderation_message_received', 'password_changed', 'password_removed',
	'pat_created', 'project_status_approved', 'project_status_neutral',
	'project_transferred', 'report_status_updated', 'report_submitted',
	'reset_password', 'two_factor_enabled', 'two_factor_removed', 'verify_email'
);

UPDATE notifications_templates
SET subject_line = REPLACE(REPLACE(REPLACE(REPLACE(subject_line,
	'Modrinth', 'Vanilla Tyme'),
	'your project', 'your shop'),
	'Your project', 'Your shop'),
	'Project ownership', 'Shop ownership');

UPDATE notifications_templates
SET plaintext_fallback = REPLACE(REPLACE(plaintext_fallback,
	'by replying to this email or through our support portal at https://support.modrinth.com (usingthe green chat bubble at the bottom of the page)', 'through our Discord at https://discord.vanillatymeservers.com'),
	'by replying to this email or through our Support Portal', 'through our Discord');


UPDATE notifications_templates
SET plaintext_fallback = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(plaintext_fallback,
	'https://support.modrinth.com', 'https://discord.vanillatymeservers.com'),
	'https://modrinth.com/project/', 'https://vanillatyme.com/shop/'),
	'https://modrinth.com', 'https://vanillatyme.com'),
	' or by replying to this email', ''),
	'reply to this email or reach out', 'reach out'),
	'Support Portal', 'Discord'),
	'Modrinth', 'Vanilla Tyme'),
	'your project', 'your shop'),
	'Your project', 'Your shop'),
	'the project', 'the shop');
