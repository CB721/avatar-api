CREATE TABLE episode(
	id SERIAL NOT NULL PRIMARY KEY
	, title VARCHAR(50) NOT NULL
	, fk_season INT NOT NULL
	, FOREIGN KEY (fk_season) REFERENCES season(season_num)
);