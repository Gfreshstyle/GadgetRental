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


create or replace function new_owner(p_fname text, p_lname text, p_add1 text, p_mobile_no numeric) returns text as
$$
declare 
	v_fname text;
	v_res text;

begin
	select into v_fname from Owner where first_name = p_fname;
		if v_fname isnull then
			if p_fname = '' or p_lname = '' or p_add1 = '' or p_mobile_no = null then 
				v_res = 'Error';
			else 
				insert into Owner(owner_first_name, owner_last_name, owner_address1, owner_mobile_no)
						values(p_fname, p_lname, p_add1, p_mobile_no);
						v_res = 'Ok';
			end if;
		else
			v_res = 'Owner already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

create or replace function update_gadgetowner(in p_owner_id int, p_owner_fname text, p_owner_lname text, p_owner_add1 text, p_owner_mobile_no numeric) returns void as
$$
	update Owner
	set
		owner_first_name = p_owner_fname,
		owner_last_name = p_owner_lname,
		owner_address1 = p_owner_add1,
		owner_mobile_no = p_owner_mobile_no

	where 
	owner_id = p_owner_id
$$
	language 'sql';

create or replace function get_gadgetowners(out int, out text, out text, out text, out numeric) returns setof record as
$$
	select owner_id, owner_first_name, owner_last_name, owner_address1, owner_mobile_no from Owner;
$$
	language 'sql';

create or replace function get_gadgetownerbyid(in p_owner_id int, out int, out text, out text, out text, out numeric) returns setof record as
$$
	select owner_id, owner_first_name, owner_last_name, owner_address1, owner_mobile_no from Owner where owner_id = p_owner_id;
$$
	language 'sql';


create or replace function new_gadget(p_item_id text, p_color text, p_brandname text, p_model text, p_rental_rate numeric, p_image text, p_owner_id int, p_category_name text, p_gadget_scale text, p_gadget_ram text, p_gadget_memory text, p_gadget_description text) returns text as
$$
declare 
	v_item_id text;
	v_res text;

begin 
	select into v_item_id from Gadget where gadget_item_id = p_item_id;
		if v_item_id isnull then
			if p_item_id = '' or p_color = '' or p_brandname = '' or p_model = '' or p_rental_rate = null or
				p_owner_id = null or p_image = null or p_category_name = null  then
				v_res = 'Error';
			else
				insert into Gadget(gadget_item_id, gadget_color, gadget_brandname, gadget_model, gadget_rental_rate, gadget_image, gadget_owner_id, gadget_category_name, gadget_scale, gadget_ram, gadget_memory, gadget_description)
					values(p_item_id, p_color, p_brandname, p_model, p_rental_rate, p_image, p_owner_id, p_category_name, p_gadget_scale, p_gadget_ram, p_gadget_memory, p_gadget_description);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Gadget already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';