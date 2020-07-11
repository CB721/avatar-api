CREATE TABLE quote(
	id SERIAL NOT NULL PRIMARY KEY
	, body TEXT NOT NULL
	, is_first_series BOOLEAN DEFAULT TRUE
	, fk_char_id INTEGER NOT NULL
	, fk_episode_id INTEGER NOT NULL
	, FOREIGN KEY (fk_char_id) REFERENCES character(id)
	, FOREIGN KEY (fk_episode_id) REFERENCES episode(id)
);