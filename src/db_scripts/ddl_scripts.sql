
CREATE TABLE USERS
(
ID varchar(60) primary key ,
NAME varchar(50) not null CHECK (NAME != ""),
EMAIL varchar(50) not null CHECK (EMAIL != ""),
PASS varchar(10) not null CHECK (PASS != ""),
DOB date not null,
PHONE_NUM varchar(20),
ADDRESS varchar(300),
IS_VERIFIED boolean,
unique(EMAIL)
);

CREATE TABLE ROUTES
(
    ID int primary key auto_increment,
    START_PLACE_ID int,
    DEST_PLACE_ID int,
    TRANSPORT_TYPE varchar(50) not null CHECK (TRANSPORT_TYPE!=""),
    DIST_KM int not null,
    FOREIGN KEY(START_PLACE_ID) REFERENCES PLACE(ID),
    FOREIGN KEY(DEST_PLACE_ID) REFERENCES PLACE(ID)
);

CREATE TABLE PLACE
(
ID INT PRIMARY KEY,
NAME VARCHAR(50),
STATE VARCHAR(50));
CREATE TABLE TRANSPORT_PRICE
(
ID int primary key,
TRANSPORT_TYPE varchar (20),
PRICE_PER_KM decimal (4,2)
);