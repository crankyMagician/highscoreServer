create DATABASE highscore;
use highscore;
Drop table scores;

create table scores
(
    id MEDIUMINT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    userName char(5) NOT NULL,
    score int NOT NULL
);


insert into scores (userName, score) values('SJR', 50);
insert into scores (userName, score) values('BSR', 100);
insert into scores (userName, score) values('HNS', 999);
insert into scores (userName, score) values('AJR', 15);

/* --------------------------------
Host name = (use the server IP address)
Database name = (cpanelUsername_databaseName)
Database username = (cpanelUsername_databaseUsername)
Database password = (the password you entered for that database user)
MySQL Connection Port = 3306
TCP or UDP, either is fine.
*/