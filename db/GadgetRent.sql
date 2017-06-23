create or replace function verifypassword(out pass)

--TABLES--

create table Owner(
	owner_id serial primary key,
	owner_first_name text,
	owner_last_name text,
	owner_address1 text,
	owner_mobile_no numeric
);

-- Add Owner

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

-- Update Owner
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

-- Get gadget owners
create or replace function get_gadgetowners(out int, out text, out text, out text, out numeric) returns setof record as
$$
	select owner_id, owner_first_name, owner_last_name, owner_address1, owner_mobile_no from Owner;
$$
	language 'sql';

-- Get gadget owner by id
create or replace function get_gadgetownerbyid(in p_owner_id int, out int, out text, out text, out text, out numeric) returns setof record as
$$
	select owner_id, owner_first_name, owner_last_name, owner_address1, owner_mobile_no from Owner where owner_id = p_owner_id;
$$
	language 'sql';

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

create or replace function update_gadget(in p_item_id text, p_color text, p_brandname text, p_model text, p_rental_rate numeric, p_image text, p_owner_id int, 
										p_category_name text, p_scale text, p_ram text, p_memory text, p_description text) returns void as
$$
	update Gadget
	set 
		gadget_color = p_color,
		gadget_model = p_model,
		gadget_rental_rate = p_rental_rate,
		gadget_image = p_image,
		gadget_category_name = p_category_name,
		gadget_owner_id = p_owner_id,
		gadget_brandname = p_brandname,
		gadget_scale = p_scale,
		gadget_ram = p_ram,
		gadget_memory = p_memory,
		gadget_description = p_description
		
	where 
		gadget_item_id = p_item_id
$$
	language 'sql';

-- Get all Gadget
create or replace function get_gadget(in p_user_id int, out text, out text, out text, out text, out numeric, out text, out int, out text, out text, out text, out text, out text, out int) returns setof record as
$$
	select gadget_item_id, gadget_color, gadget_brandname, gadget_model, gadget_rental_rate, gadget_image, gadget_owner_id, gadget_category_name, gadget_scale, gadget_ram, gadget_memory, gadget_description, UserAccount.user_id 
		from Gadget CROSS JOIN UserAccount where UserAccount.user_id = p_user_id;
$$
	language 'sql';

-- Get gadgets in admin
create or replace function get_gadgetsinadmin(out text, out text, out text, out text, out numeric, out text, out int, out text, out text, out text, out text, out text) returns setof record as
$$
	select gadget_item_id, gadget_color, gadget_brandname, gadget_model, gadget_rental_rate, gadget_image, gadget_owner_id, gadget_category_name, gadget_scale, gadget_ram, gadget_memory, gadget_description from Gadget
$$
	language 'sql';

-- Get gadget by item_id
create or replace function get_gadgetbyplatenumber(in p_item_id text, in p_user_id int, out text, out text, out text, out text, out numeric, out text, out int, out text, out text, out text, out text, out text, out int) returns setof record as
$$
	select  gadget_item_id, gadget_color, gadget_brandname, gadget_model, gadget_rental_rate, gadget_image, gadget_owner_id, gadget_category_name, gadget_scale, gadget_ram, gadget_memory, gadget_description, UserAccount.user_id 
		from Gadget CROSS JOIN UserAccount where gadget_item_id = p_item_id and user_id = p_user_id;
$$
	language 'sql';

-- Get gadget by itemid in admin
create or replace function get_gadgetbyitemidinadmin(in p_item_id text, out text, out text, out text, out text, out numeric, out text, out int, out text, out text, out text, out text, out text) returns setof record as
$$
	select gadget_item_id, gadget_color, gadget_brandname, gadget_model, gadget_rental_rate, gadget_image, gadget_owner_id, gadget_category_name, gadget_scale, gadget_ram, gadget_memory, gadget_description 
		from Gadget where gadget_item_id = p_item_id;
$$
	language 'sql';

-- Get gadget by category
create or replace function get_gadgetbycategory(in p_category_name text, in p_user_id int, out text, out text, out text, out text,
		out text, out numeric, out text, out int, out text, out text, out text, out text, out int) returns setof record as
$$
	select gadget_category_name, gadget_item_id, gadget_color, gadget_brandname, gadget_model,
		gadget_rental_rate, gadget_image, gadget_owner_id, gadget_scale, gadget_ram, gadget_memory, gadget_description, UserAccount.user_id from Gadget CROSS JOIN UserAccount
		where gadget_category_name = p_category_name and UserAccount.user_id = p_user_id;
$$
	language 'sql';

-- Get gadget by brandname
create or replace function get_gadgetbybrandname(in p_brandname text, out text, out text, out text, out numeric, out text, out int, out text, out text, out text, out text, out text) returns setof record as
$$
	select gadget_item_id, gadget_color, gadget_model, gadget_rental_rate, gadget_image, gadget_owner_id, gadget_category_name, gadget_scale, gadget_ram, gadget_memory, gadget_description from Gadget where gadget_brandname = p_brandname;
$$
	language 'sql';

-- Get gadget by category and brandname
create or replace function get_gadgetbycategorybrandname(in p_category_name text, in p_brandname text, in p_user_id int,
	out text, out text, out text, out text, out numeric, out text, out int, out text, out text, out text, out text, out int) returns setof record as
$$
	select gadget_category_name, gadget_item_id, gadget_color, gadget_model, gadget_rental_rate, gadget_image, gadget_owner_id, gadget_scale, gadget_ram, gadget_memory, gadget_description, UserAccount.user_id 
		from Gadget CROSS JOIN UserAccount where gadget_category_name = p_category_name and gadget_brandname = p_brandname and user_id = p_user_id;
$$
	language 'sql';

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

-- New Admin
	
create or replace function new_admin(p_email text, p_password text) returns text as
$$
declare 
	v_email text;
	v_res text;

begin
	select into v_email email from UserAccount where email = p_email;
		if v_email isnull then
			if p_email = '' or p_password = '' then
				v_res = 'Error';
			else
				insert into UserAccount(email, password, is_admin)
					values(p_email, p_password, TRUE);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Email already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- New Customer
create or replace function new_customer(p_email text, p_password text) returns text as
$$
declare 
	v_email text;
	v_res text;

begin
	select into v_email email from UserAccount where email = p_email;

		if v_email isnull then
			if p_email = '' or p_password = '' then
				v_res = 'Error';
			else
				insert into UserAccount(email, password, is_customer)
					values(p_email, p_password, TRUE);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Email already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Update account
create or replace function update_useraccount(in p_user_id int, p_firstname text, p_lastname text,
								p_address1 text, p_mobileno numeric, email text) returns void as
$$
	update UserAccount
	set
		first_name = p_firstname,
		last_name = p_lastname,
		address1 = p_address1,
		mobile_no = p_mobileno

	where
		user_id = p_user_id
$$
	language 'sql';	

-- Get userprofile by id
create or replace function get_userprofile(in p_user_id int, out int, out text,
								out text, out text, out numeric, out text) returns setof record as
$$
	select user_id, first_name, last_name, address1, mobile_no, email from UserAccount where user_id = p_user_id;
$$
	language 'sql'

-- Get customers
create or replace function get_customers(out int, out text, out text, out text, out numeric, out text,
										out text, out boolean, out boolean) returns setof record as
$$
	select user_id, first_name, last_name, address1, mobile_no, email,
			password, is_admin, is_customer from UserAccount where is_customer = TRUE;
$$
	language 'sql';

-- Login
create or replace function login(p_email text, p_password text) returns text as
$$
declare
	v_email text;
	v_res text;

begin
	select into v_email email from UserAccount where email = p_email and password = p_password;
	if v_email isnull or p_email = '' or p_password = '' then
		v_res = 'Invalid credentials';
	else
		v_res = 'Login successful';
	end if;
	return v_res;
end;
$$
	language 'plpgsql';

-- Login role with users email
create or replace function get_userbyemail(in p_email text, out text, out int, out text, out text, out text, 
										 out numeric, out boolean, out boolean) returns setof record as
$$
	select email, user_id, first_name, last_name, address1, mobile_no, is_admin, is_customer from UserAccount where email = p_email;
$$
	language 'sql';

create table Category(
	category_name text primary key
);

-- New category
create or replace function new_category(p_category_name text) returns text as
$$
declare
	v_category_name text;
	v_res text;

begin
	select into v_category_name category_name from Category where category_name = p_category_name;

		if v_category_name isnull then
			if p_category_name = '' then
				v_res = 'Error';
			else
				insert into Category(category_name)
					values(p_category_name);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Category already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get category 
create or replace function get_category(in p_user_id int, out text, out int) returns setof record as 
$$
	select category_name, user_id from Category CROSS JOIN UserAccount where UserAccount.user_id = p_user_id;
$$
	language 'sql';

create table Brand(
	brandname text primary key
);

-- New brandname
create or replace function new_brand(p_brandname text) returns text as
$$
declare
	v_brandname text;
	v_res text;

begin
	select into v_brandname brandname from Brand where brandname = p_brandname;

		if v_brandname isnull then
			if p_brandname = '' then
				v_res = 'Error';
			else
				insert into Brand(brandname)
					values(p_brandname);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Brand already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

-- Get Brand
create or replace function get_brand(out text) returns setof text as
$$
	select brandname from Brand;
$$
	language 'sql';

create or replace function get_categorybrand(out text, out text) returns setof record as
$$
	select Category.category_name, Brand.brandname From Category Cross Join Brand;
$$
	language 'sql';

create or replace function get_categorybrand2(out text, out text) returns setof record as
$$ 
	select category_name, brandname From Category, Brand;
$$
	language 'sql';


create table Cart(
	cart_id serial primary key,
	cart_total numeric default 0,
	cart_time_added timestamp default current_timestamp ,
	cart_item_id text references Gadget(gadget_item_id),
	cart_user_id int references UserAccount(user_id)
);

create or replace function cart_addproduct(p_cart_plate_number text, p_user_id int) returns text as
$$
declare
	v_cart_item_id text;
	v_res text; 

begin
	select into v_cart_item_id cart_item_id from Cart where cart_item_id = p_cart_item_id and cart_user_id = p_user_id ;

		if v_cart_plate_number isnull then
			if p_cart_item_id = '' or p_user_id = null then
				v_res = 'Error';
			else
				insert into Cart(cart_item_id, cart_user_id)
					values(p_cart_item_id, p_user_id);
					v_res = 'Ok';
			end if;
		else
			v_res = 'Gadget already exists';
		end if;
		return v_res;
end;
$$
	language 'plpgsql';

create or replace function get_cartbyuser2(in p_user_id int, out text, out text, out text, out text,
										out text, out numeric, out text, out text, out text, out text, out text, out int, out int) returns setof record as 
$$
	select Gadget.gadget_item_id, Gadget.gadget_category_name, Gadget.gadget_brandname, Gadget.gadget_model, Gadget.gadget_color, Gadget.gadget_rental_rate, Gadget.gadget_image, Gadget.gadget_scale, Gadget.gadget_ram, Gadget.gadget_memory, Gadget.gadget_description, 
					cart_user_id, cart_id from Cart Cross Join Gadget where Gadget.gadget_item_id = Cart.cart_item_id
					and Cart.cart_user_id = p_user_id;
$$
	language 'sql'; 

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

create or replace function rentgadget(p_rent_item_id text, p_user_id int) returns text as
$$
declare
	v_rent_item_id text;
	v_res text;

begin 	
	select into v_rent_item_id rent_item_id from Rent where rent_item_id = p_rent_item_id;

		if v_rent_item_id isnull then
			if p_rent_item_id = '' or p_user_id = null then
				v_res = 'Error';
			else 
				insert into Rent(rent_item_id, rent_user_id)
					values(p_rent_item_id, p_user_id);
					v_res = 'Ok';

			end if;
		else
			v_res = 'Gadget in Rent';
		end if;
		return v_res;
end 
$$
	language 'plpgsql';
		
create or replace function getrentbyuserid(in p_user_id int, out int, out timestamp, out date, out numeric, out int, out text, out int, out int) returns setof record as
$$
	select rental_id, rent_date_rented, rent_date_due, rent_total_bill, rent_overdue_cost, rent_item_id, rent_user_id, rent_quantity from Rent where rent_user_id = p_user_id;
$$
	language 'sql';


create or replace function getallrents(out int, out timestamp, out date, out numeric, out int, out text, out int, out int) returns setof record as
$$
	select rental_id, rent_date_rented, rent_date_due, rent_total_bill, rent_overdue_cost, rent_item_id, rent_user_id, rent_quantity from Rent order by rent_date_rented desc;
$$
	language 'sql';

