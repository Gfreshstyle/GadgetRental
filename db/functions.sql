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


--	QUERIES
select new_role('Administrator');
select new_role('Customer');
select new_role('Owner');