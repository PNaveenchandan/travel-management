
CREATE TABLE travel.USERS
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


CREATE TABLE travel.PLACE
(
ID INT PRIMARY KEY auto_increment,
NAME VARCHAR(50),
STATE VARCHAR(50));

CREATE TABLE travel.ROUTES
(
    ID int primary key auto_increment,
    START_PLACE_ID int,
    DEST_PLACE_ID int,
    TRANSPORT_TYPE varchar(50) not null CHECK (TRANSPORT_TYPE!=""),
    DIST_KM int not null,
    FOREIGN KEY(START_PLACE_ID) REFERENCES PLACE(ID),
    FOREIGN KEY(DEST_PLACE_ID) REFERENCES PLACE(ID)
);

CREATE TABLE travel.TRANSPORT_PRICE
(
ID int primary key auto_increment,
TRANSPORT_TYPE varchar (20),
PRICE_PER_KM decimal (4,2)
);



 CREATE TABLE travel.BOOKINGS
(
ID int primary key auto_increment,
TOTAL_AMOUNT decimal(8,2) not null,
TRAVEL_DATE DATE NOT NULL,
BOOKED_DATE  DATETIME default current_timestamp,
ROUTE_ID INT not null, 
USER_ID varchar(60),
BOOK_STATUS varchar(50),
FOREIGN KEY(ROUTE_ID) REFERENCES ROUTES(ID),
FOREIGN KEY(USER_ID) REFERENCES USERS(ID)
 );

 ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'password'