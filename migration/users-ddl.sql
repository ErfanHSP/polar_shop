CREATE TABLE polar_shop_db.users (
	id int(10) unsigned not null AUTO_INCREMENT,
    email varchar(255) unique not null,
    fullname varchar(255) not null,
    username varchar(30) unique not null,
    roles enum("user", "admin") default "user",
    avatar varchar(255) default null,
    password varchar(255) not null,
    primary key(id)
) AUTO_INCREMENT = 1000