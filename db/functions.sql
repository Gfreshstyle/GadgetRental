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
create or replace function get_gadgets(out int, out text, out text, out text, out text, out text, out numeric, out int, out int, out int, out boolean, out boolean)
	returns setof record as
	$$
		select *
		from Gadget;

	$$
		language 'sql';



--	QUERIES
select new_role('Administrator');
select new_role('Customer');