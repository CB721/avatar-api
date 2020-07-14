CREATE TABLE character(
	id SERIAL NOT NULL PRIMARY KEY
	, char_name VARCHAR(50) NOT NULL
	, image_link VARCHAR(255)
	, can_bend SMALLINT[]
	, age SMALLINT 
);