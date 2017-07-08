create table Role
(
	id              serial primary key,
	role_name       varchar(50)
);

create table UserAccount
(
	id              serial primary key,
	first_name		varchar(50),
	middle_name		varchar(50),
	last_name		varchar(50),
	email			varchar(50),
	password		varchar(50),
	address			varchar(50),
	mobile_no		varchar(50),
	role_id			int references Role(id),
	is_active		boolean default true
);

create table Brands
(
	id              serial primary key,
	brand_name 		varchar(50)	
);

create table Category
(
	id              serial primary key,
	category_name	varchar(50)
);

create table Gadget
(
	id              serial primary key,
	gadget_name		varchar(50) not null,
	gadget_description text not null,
	gadget_model	varchar(50) not null,
	gadget_color	varchar(50) not null,
	gadget_image	varchar(50),
	rental_rate		numeric,
	gadget_brand_id	int references Brands(id),
	gadget_category_id int references Category(id),
	gadget_owner_id	int references UserAccount(id),
	is_rented		boolean default false
);

create table RentGadget
(
	id              serial primary key,
	quantity		int default 1,
	gadget_id		int references Gadget(id)
);

create table Rent
(
	id              serial primary key,
	user_id			int references UserAccount(id),
	rent_gadget_id	int references RentGadget(id),
	rent_due_date	timestamp default now()
);

create table Transaction
(
	id              	serial primary key,
	transaction_number 	int,
	transaction_date 	timestamp default now(),	
	rent_id 			int references Rent(id),
	rent_overdue_cost 	int default 0,
	total				numeric
);