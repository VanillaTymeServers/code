-- Match the report reasons to the Vanilla Tyme Content Rules. Renames keep existing reports linked.
UPDATE report_types SET name = 'harassment' WHERE name = 'malicious';
UPDATE report_types SET name = 'impersonation' WHERE name = 'name-squatting';

INSERT INTO report_types (name) VALUES
	('personal-information'),
	('wrong-shop-info'),
	('advertising');
