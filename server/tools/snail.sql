create table books(
    id int not null auto_increment primary key,
    isbn varchar(20) not null,
    openid varchar(50) not null,
    title varchar(50) not null,
    image varchar(100),
    alt varchar(100) not null,
    publisher varchar(100) not null,
    summary varchar(1000) not null,
    price varchar(100),
    rate float,
    tags varchar(100),
    author varchar(100)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci


create table comments(
    id int not null auto_increment primary key,
    openId varchar(100) not null,
    bookId varchar(10) not null,
    comment varchar(200) not null,
    phone varchar(100) ,
    location varchar(200)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci