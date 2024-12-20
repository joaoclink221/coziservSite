create database coziserv;
use coziserv;

create table tb_login(
email                varchar(200),
senha                varchar(64)
);

create table tb_clientes(
id_cliente		int primary key auto_increment,
nm_cliente		varchar(255),
cnpj			varchar(255),
razao			varchar(255)
);

create table tb_servicos(
id_servico		int primary key auto_increment,
nm_cliente		varchar(255),
tipo_servico	varchar(255),
dt_passada		date,
valor			decimal(10,2),
cnpj			varchar(255),
razao			varchar(255)
);