CREATE TABLE data_table(
	id_data_table varchar(60) not null UNIQUE,
	table_name varchar(80) not null,
	description varchar(250),
	date_create timestamp default current_timestamp,
	user_create varchar(80) default 'default',
	date_update timestamp default current_timestamp,
	user_update varchar(80) default 'default',
	primary key (id_data_table)
);

CREATE TABLE data_field(
	id_data_field varchar(60) not null UNIQUE,
	id_data_table varchar(60) not null,
	field_name varchar(80) not null,
	date_create timestamp default current_timestamp,
	user_create varchar(80) default 'default',
	date_update timestamp default current_timestamp,
	user_update varchar(80) default 'default',
	primary key (id_data_field),
	foreign key (id_data_table) references data_table(id_data_table)
);

CREATE TABLE project(
	id_project varchar(60) not null UNIQUE,
	name varchar(80) not null,
	description varchar(250),
	date_create timestamp default current_timestamp,
	user_create varchar(80) default 'default',
	date_update timestamp default current_timestamp,
	user_update varchar(80) default 'default',
	primary key (id_project)
);

CREATE TABLE sheet(
	id_sheet varchar(60) not null UNIQUE,
	id_project varchar(60) not null,
	title varchar(80) not null,
	nivel int default 0 not null,
	is_query BOOLEAN not null default FALSE,
	id_query int null,
	is_plain BOOLEAN not null default FALSE,
	id_plain int null,
	date_create timestamp default current_timestamp,
	user_create varchar(80) default 'default',
	date_update timestamp default current_timestamp,
	user_update varchar(80) default 'default',
	primary key (id_project)
);

CREATE TABLE query(
	id_query varchar(60) not null UNIQUE,
	id_data_table varchar(60) not null,
	name varchar(80),
	sentencia varchar(500),
	date_create timestamp default current_timestamp,
	user_create varchar(80) default 'default',
	date_update timestamp default current_timestamp,
	user_update varchar(80) default 'default',
	primary key (id_query),
	foreign key (id_data_table) references data_table(id_data_table)
);

CREATE TABLE query_field(
	id_query_field varchar(60) not null UNIQUE,
	id_query varchar(60) not null,
	filed_name varchar(80) not null,
	is_active int not null,
	primary key (id_query_field),
	foreign key (id_query) references query(id_query)
);

CREATE TABLE plain(
	id_plain varchar(60) not null UNIQUE,
	name varchar(80) not null,
	full_text varchar(5000) not null,
	primary key (id_plain)
);

CREATE COLUMN TABLE "DBADMIN"."USUARIO"(
	"USERNAME" NVARCHAR(20) NOT NULL,
	"PASSWORD" NVARCHAR(60) NOT NULL,
	"PERFIL" NVARCHAR(25) DEFAULT 'USER_STANDAR' NOT NULL,
	PRIMARY KEY("USERNAME")
);

-- username: admin | password: 1234
INSERT INTO USUARIO (username, password, perfil) VALUES ('admin','$2a$10$pIxE.wehtIoOPmGbEUEYAOc3Y8Ta3YYqpejHP9IYhZh9FwEr8SRSG', 'USER_ADMIN');
