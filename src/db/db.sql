create table subscriptions (
	id serial,
	subscription_date timestamp,
	name text,
	last_mensage int,
	active boolean,
	PRIMARY KEY(id)
);

create table mensagem_flow(
	id serial,
	template_name text,
	posit int,
	PRIMARY KEY(id)
);



insert into mensage_flow (template_name, posit) values
( 'inicial', 0),
('mensagem1', 0),/*domingo, segunda ....*/
('mensagem2',1),
('mensagem3',2),
('mensagem4',3),
('mensagem5',4),
('mensagem6',5),
('mensagem7',6);