CREATE TABLE character(
	id SERIAL NOT NULL PRIMARY KEY
	, char_name VARCHAR(50) NOT NULL
	, image_links JSONB
	, can_bend SMALLINT[]
	, age SMALLINT 
);

-- get characters by their elements
SELECT * FROM character
WHERE can_bend @> ARRAY[1, 2]::smallint[];