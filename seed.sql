DROP DATABASE IF EXISTS company;
CREATE DATABASE company;
\c company;

CREATE TABLE personnel (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    phone INTEGER
); 

INSERT INTO personnel (name, phone) VALUES ('Nathan', 1234567890);
INSERT INTO personnel (name, phone) VALUES ('Lindsey', 1234567890);
INSERT INTO personnel (name, phone) VALUES ('Carl', 1234567890);
INSERT INTO personnel (name, phone) VALUES ('Gabe', 1234567890);
INSERT INTO personnel (name, phone) VALUES ('Evan', 1234567890);