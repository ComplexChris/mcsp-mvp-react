-- Create tables here.
DROP TABLE IF EXISTS quiz_results;

CREATE TABLE quiz_results (
   id       SERIAL PRIMARY KEY NOT NULL,
   user_name  TEXT NOT NULL,
   category  TEXT NOT NULL,
   difficulty  TEXT NOT NULL,
   total_time  INT NOT NULL,
   total_questions  INT NOT NULL,
   score  INT NOT NULL,
   score_percent INT NOT NULL
);
