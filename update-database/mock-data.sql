-- Insert into carts table
INSERT INTO public.carts(
	id, user_id, created_at, updated_at, status)
	VALUES
	('a52dec41-6def-4ed7-aff8-fa60f86eaa53', '541e3622-139b-4f95-bceb-cde6cf65fc10', DEFAULT, DEFAULT, 'OPEN'),
	('a556dd6c-ac50-4cb2-8daa-d9658c95192f', 'f9559b7c-ebd4-4f28-86a2-f68568198d28', DEFAULT, DEFAULT, 'OPEN');

-- Insert into products table
INSERT INTO public.products(
	id, title, description, price)
	VALUES 
	('88005a6e-841f-4124-9cba-cb60ca0a546e', 'Abbey Road', 'The Beatles - Abbey Road', 29.99),
	('dafa0fa9-1b48-4692-9b21-807774760b36', 'Dark Side of the Moon', 'Pink Floyd - Dark Side of the Moon', 35.99);

-- Insert into cart_items table
INSERT INTO public.cart_items(
	cart_id, count, id, product_id)
	VALUES 
	('a52dec41-6def-4ed7-aff8-fa60f86eaa53', 1, DEFAULT, '88005a6e-841f-4124-9cba-cb60ca0a546e'),
	('a556dd6c-ac50-4cb2-8daa-d9658c95192f', 2, DEFAULT, 'dafa0fa9-1b48-4692-9b21-807774760b36');

-- Insert into users table
INSERT INTO public.users(
	id, name, email, password, created_at)
	VALUES
	(DEFAULT, 'User Name', 'username@gmail.com', '54321', DEFAULT),
	(DEFAULT, 'User Name', 'username@gmail.com', '54321', DEFAULT);

-- Insert into orders table
INSERT INTO public.orders(
	id, user_id, cart_id, payment, delivery, comments, total, status)
	VALUES 
    (DEFAULT, '541e3622-139b-4f95-bceb-cde6cf65fc10', 'a52dec41-6def-4ed7-aff8-fa60f86eaa53', '{"method": "cash", "amount": 111}', '{"type": "test type", "address": "test address 1"}', '', 111, 'ORDERED'),
    (DEFAULT, 'f9559b7c-ebd4-4f28-86a2-f68568198d28', 'a556dd6c-ac50-4cb2-8daa-d9658c95192f', '{"method": "card", "amount": 222}', '{"type": "test type", "address": "test address 2"}', '', 222, 'ORDERED');
