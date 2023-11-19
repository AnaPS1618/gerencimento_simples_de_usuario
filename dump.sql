create database gerenciamento_Usuarios;

create table cadastro (
  id serial primary key,
  nome text not null, 
  email varchar(50) not null, 
  senha text not null
);