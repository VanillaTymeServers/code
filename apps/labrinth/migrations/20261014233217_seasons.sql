CREATE TABLE seasons (
	id INTEGER PRIMARY KEY,
	started_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO seasons (id) VALUES (10);

UPDATE mods
SET components = jsonb_set(components, '{shop,season}', '10')
WHERE components ? 'shop';
