-- Create tables here.
DROP TABLE IF EXISTS tweets;

CREATE TABLE tweets (
   id       SERIAL PRIMARY KEY NOT NULL,
   message  TEXT NOT NULL
);
