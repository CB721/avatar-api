CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE TABLE users (
	id SERIAL NOT NULL PRIMARY KEY
	, first_name VARCHAR(50) NOT NULL
	, last_name VARCHAR(50) NOT NULL
	, email VARCHAR(50) NOT NULL
	, api_key UUID DEFAULT uuid_generate_v4 ()
);