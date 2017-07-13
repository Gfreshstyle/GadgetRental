-- Add Role
-- select new_role('Administrator');
create or replace function new_role(p_role_name varchar)
	returns text as
	$$
		declare
			loc_name text;
			loc_response text;
		begin
			select into loc_name role_name from Role where role_name = p_role_name;

				if loc_name isnull then
					insert into Role(role_name) 
						values (p_role_name);
					loc_response = 'ok';

				else
					loc_response = 'existed';

				end if;
				return loc_response;
		end;
	$$
		language 'plpgsql';


-- Add User Account
-- select new_user('fname', 'mname', 'lname', 'test@gmail.com', 'pass', 'Iligan City', '09234567891', 1 );
create or replace function new_user(p_first_name varchar, p_middle_name varchar, p_last_name varchar, p_email varchar, p_password varchar, 
	p_address varchar, p_mobile_no varchar, p_role_id int)
	returns text as
	$$
		declare
			loc_email text;
			loc_name text;
			loc_response text;
		begin
			select into loc_email email from UserAccount where email = p_email;
				if loc_email isnull then
					select into loc_name first_name || middle_name || last_name from UserAccount where  first_name = p_first_name and middle_name =  p_middle_name and last_name = p_last_name;
						if loc_name isnull then
							if p_first_name = '' or p_last_name = '' or p_email = '' or p_password = '' or p_address = '' or p_mobile_no = null then 
								loc_response = 'Please fill the require field/s';
							else
								insert into UserAccount(first_name, middle_name, last_name, email, password, address, mobile_no, role_id)
									values(p_first_name, p_middle_name, p_last_name, p_email, p_password, p_address, p_mobile_no, p_role_id);
								
								loc_response = 'Ok';
							end if;
						else
							loc_response = 'User already exists';
						end if;
				else
					loc_response = 'Email already exists';

				end if;		
				return loc_response;

		end; 
	$$
		language 'plpgsql';


-- Check email and password
-- select check_email_password('test@gmail.com','sha256$j8a3VuIn$0ece41a3def180fce520ed15dd68d44a5626f7e33c51d672ed93e9ea4e4a67bd');
create or replace function check_email_password(p_email varchar, p_password varchar)
	returns text as
	$$
		declare
		loc_email text;
		loc_password text;
		loc_response text;

		begin
			select into loc_email email
			from UserAccount
			where email = p_email and password = p_password;

			if loc_email isnull then
				loc_response = 'Invalid email address or password';
			else
				loc_response = 'Ok';
			end if;
			return loc_response;
		end;
	$$
		language 'plpgsql';


-- Get password by email
-- select get_password_by_email('test@gmail.com');
create or replace function get_password_by_email(p_email varchar)
	returns text as
	$$
		select password
		from UserAccount
		where email = p_email
	$$
		language 'sql';


-- Get userprofile by id
-- select get_userprofile(1);
create or replace function get_userprofile(in p_user_id int, out int, out text, out text, out text, out text, out text, out text, out text, out int, out boolean)
	returns setof record as
	$$
		select *
		from UserAccount
		where id = p_user_id;
	$$
		language 'sql';

-- Add Gadget
-- select new_gadget('gname', 'gdesc', 'gmodel','black', 'g.jpg', 100, 1, 1, 1);
create or replace function new_gadget(p_gadget_name varchar, p_gadget_description text, p_gadget_model varchar, p_gadget_color varchar, p_gadget_image varchar, p_rental_rate numeric, p_gadget_brand_id int, p_gadget_category_id int, p_gadget_owner_id int)
	returns text as
	$$
		declare
			loc_gadget_name text;
			loc_response text;

		begin
			select into loc_gadget_name gadget_name from Gadget where gadget_name = p_gadget_name;
			if loc_gadget_name isnull then
				if p_gadget_name = '' or p_gadget_description = '' or p_gadget_model = '' or p_gadget_color = '' or p_gadget_image = '' then
					loc_response = 'Please fill the require field/s';
				else
					insert into Gadget(gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, gadget_brand_id, gadget_category_id, gadget_owner_id)
						values(p_gadget_name, p_gadget_description, p_gadget_model, p_gadget_color, p_gadget_image, p_rental_rate, p_gadget_brand_id, p_gadget_category_id, p_gadget_owner_id);

					loc_response = 'Ok';
				end if;
			else
				loc_response = 'Gadget already exists';
			end if;
			return loc_response;
		end;

	$$
		language 'plpgsql';


-- Get gadget by id
-- select get_gadget_by_id(1);
create or replace function get_gadget_by_id(in p_gadget_id int, out int, out text, out text, out text, out text, out text, out numeric, out int, out int, out int, out boolean, out boolean)
	returns setof record as
	$$
		select *
		from Gadget
		where id = p_gadget_id;

	$$
		language 'sql';


-- Get all gadgets
-- select get_gadgets();
CREATE OR REPLACE FUNCTION get_gadgets(OUT text,OUT text,OUT text,OUT text,OUT text,OUT numeric,OUT text,OUT text,OUT text,OUT boolean)returns setof record AS
	$$
		select gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, Brands.brand_name,
				Category.category_name, UserAccount.first_name, is_rented
		from (((Gadget 
			inner join Brands on Gadget.gadget_brand_id = Brands.id)
			inner join Category on Gadget.gadget_category_id = Category.id)
			inner join UserAccount on Gadget.gadget_owner_id = UserAccount.id)
		where Gadget.is_active = TRUE;
	$$
	language 'sql';

-- Get Users
-- select get_users(2);
create or replace function get_users(in p_role_id int, out int, out text, out text, out text, out text, out text, out text, out text, out int, out boolean)
	returns setof record as
	$$
		select *
		from UserAccount
		where role_id = p_role_id;
	$$
		language 'sql';

-- View Rented Gadgets
--select view_rented();

create or replace function view_rented(out par_gadget_name varchar, out par_gadget_description text, out par_gadget_model varchar,
					out par_gadget_color varchar, out par_gadget_image varchar, out par_rental_rate numeric,
					out par_brand_name varchar, out par_category_name varchar, out par_username varchar) returns setof record as
$$
	Select gadget_name, gadget_description, gadget_model, gadget_color, gadget_image, rental_rate, Brands.brand_name,
			Category.category_name, UserAccount.first_name
		from (((Gadget 
			inner join Brands on Gadget.gadget_brand_id = Brands.id)
			inner join Category on Gadget.gadget_category_id = Category.id)
			inner join UserAccount on Gadget.gadget_owner_id = UserAccount.id)
		where is_rented = TRUE;
$$
 LANGUAGE 'sql';



create or replace function update_gadget(par_id int,par_gadget_name varchar, par_gadget_description text, par_gadget_model varchar,
										 par_gadget_color varchar ,par_gadget_image varchar, par_rental_rate numeric,
										 par_brand_id int, par_category_id int, par_userid int) returns void as
	$$
	Update Gadget
	SET 
	gadget_name = par_gadget_name,
	gadget_description = par_gadget_description,
	gadget_model = par_gadget_model,
	gadget_color = par_gadget_color,
	gadget_image = par_gadget_image,
	rental_rate = par_rental_rate,
	gadget_brand_id = par_brand_id,
	gadget_category_id = par_category_id,
	gadget_owner_id = par_userid

	where id = par_id;
$$
LANGUAGE 'sql';


create or replace function rent_gadget(par_transac_date timestamp, par_due_date timestamp, par_gadget_id int, par_userid int,) returns text as
	$$

	declare
	local_response text;
	begin 

		if (SELECT is_rented  from Gadget where id = par_gadget_id) = FALSE Then
			Insert into RentGadget(transaction_date, rent_due_date, gadget_id, user_id)
			values (par_transac_date, par_due_date par_gadget_id, par_userid);
			Update Gadget SET is_rented = TRUE where id = par_gadget_id;
			local_response = 'OK';
		else 
			local_response = 'Error';
		end if;
	return local_response;
	end;


$$
LANGUAGE 'plpgsql';

create or replace function delete(par_gadget_id int) returns void as
	$$

	Update Gadget
	SET 
	is_active = False
	where id = par_id;

	$$
 LANGUAGE 'sql';


-- Add category
-- select new_category('Cellphone');
create or replace function new_category(p_category_name varchar) 
	returns text as
	$$
		declare
			loc_name text;
			loc_response text;

		begin
			select into loc_name category_name from Category where lower(category_name) = lower(p_category_name);

			if loc_name isnull then
				insert into Category(category_name)
					values(p_category_name);

				loc_response = 'Ok';
			else
				loc_response = 'Existed';
			end if;

			return loc_response;
		end;
	$$
		language 'plpgsql';



-- Add brand
-- select new_brand('Samsung');
create or replace function new_brand(p_brand_name varchar) 
	returns text as
	$$
		declare
			loc_name text;
			loc_response text;

		begin
			select into loc_name brand_name from Brands where lower(brand_name) = lower(p_brand_name);

			if loc_name isnull then
				insert into Brands(brand_name)
					values(p_brand_name); 

				loc_response = 'Ok';
			else
				loc_response = 'Existed';
			end if;

			return loc_response;
		end;
	$$
		language 'plpgsql';



--	QUERIES
select new_role('Administrator');
select new_role('Customer');


select new_brand('Samsung');
select new_brand('Panasonic');
select new_brand('Sharp');
select new_brand('LG');
select new_brand('Sony');
select new_brand('TOSHIBA');
select new_brand('SANYO');
select new_brand('Acer');
select new_brand('Haier');
select new_brand('Philips');
select new_brand('Canon');
select new_brand('Casio');
select new_brand('Kodak');
select new_brand('Nikon');


select new_category('Cellphone');
select new_category('Television');
select new_category('Calculator');
select new_category('Camera');
select new_category('Speaker');--	QUERIES
select new_role('Administrator');
select new_role('Customer');

select new_brand('Samsung');
select new_brand('Panasonic');
select new_brand('Sharp');
select new_brand('LG');
select new_brand('Sony');
select new_brand('TOSHIBA');
select new_brand('SANYO');
select new_brand('Acer');
select new_brand('Haier');
select new_brand('Philips');
select new_brand('Canon');
select new_brand('Casio');
select new_brand('Kodak');
select new_brand('Nikon');


select new_category('Cellphone');
select new_category('Television');
select new_category('Calculator');
select new_category('Camera');
select new_category('Speaker'); 