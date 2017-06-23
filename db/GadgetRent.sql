create or replace function verifypassword(out pass)

--TABLES--

create table Owner(
	owner_id serial primary key,
	owner_first_name text,
	owner_last_name text,
	owner_address1 text,
	owner_mobile_no numeric
);

create table Gadget(
	-- gadget_id serial primary key,
	gadget_item_id text primary key,
	gadget_color text,
	gadget_model text,
	gadget_rental_rate numeric,
	gadget_image text,
	gadget_scale text,
	gadget_ram text,
	gadget_memory text,
	gadget_description text, 
	gadget_owner_id int references Owner(owner_id),
	gadget_category_name text references Category(category_name),
	gadget_brandname text references Brand(brandname)
);

create table GadgetPix(
	cp_id serial primary key,
	image1 text,
	image2 text,
	image3 text,
	image4 text,
	item_id text references Gadget(gadget_item_id)

);


create table UserAccount(
	user_id serial primary key,
	first_name text default null,
	last_name text default null,
	address1 text default null,
	mobile_no numeric default null,
	email text unique not null,
	password text not null,
	is_admin boolean default false,
	is_customer boolean default false
);


create table Category(
	category_name text primary key
);

create table Brand(
	brandname text primary key
);


create table Cart(
	cart_id serial primary key,
	cart_total numeric default 0,
	cart_time_added timestamp default current_timestamp ,
	cart_item_id text references Gadget(gadget_item_id),
	cart_user_id int references UserAccount(user_id)
);

create table Rent(
	rental_id serial primary key,
	rent_date_rented timestamp default current_timestamp,
	rent_date_due date default now(),
	rent_total_bill numeric,
	rent_overdue_cost int default 0,
	rent_item_id text references Gadget(gadget_item_id),
	rent_user_id int references UserAccount(user_id),
	rent_quantity int default 1
);


