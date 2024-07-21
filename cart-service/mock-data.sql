-- Insert into carts table
INSERT INTO public.carts(
	id, user_id, created_at, updated_at, status)
	VALUES
	('585e5c07-41d1-49ac-bcb9-c05e72753f30', '08c69f2f-72a1-4fc0-a02d-075b2f6b1693', DEFAULT, DEFAULT, 'OPEN'),
	('fc59b626-e9e5-4af4-8c67-bc9d179e0b5a', '8a3765d5-857b-43be-8526-18c23f2927a7', DEFAULT, DEFAULT, 'OPEN');

-- Insert into products table
INSERT INTO public.products(
	id, title, description, price)
	VALUES 
	('9b16a825-a0a5-4d2b-b236-f0233d19b3be', 'Abbey Road', 'The Beatles - Abbey Road', 29.99),
	('d41e920f-a53a-4307-ae14-6ea4c0bf2e5e', 'Dark Side of the Moon', 'Pink Floyd - Dark Side of the Moon', 35.99);

-- Insert into cart_items table
INSERT INTO public.cart_items(
	cart_id, count, id, product_id)
	VALUES 
	('585e5c07-41d1-49ac-bcb9-c05e72753f30', 1, DEFAULT, '9b16a825-a0a5-4d2b-b236-f0233d19b3be'),
	('fc59b626-e9e5-4af4-8c67-bc9d179e0b5a', 2, DEFAULT, 'd41e920f-a53a-4307-ae14-6ea4c0bf2e5e');

-- Insert into users table
INSERT INTO public.users(
	id, name, email, password, created_at)
	VALUES
	(DEFAULT, 'John Doe', 'john-doe@gmail.com', '12345', DEFAULT),
	(DEFAULT, 'Jane Doe', 'jane-doe@gmail.com', '12345', DEFAULT);

-- Insert into orders table
INSERT INTO public.orders(
	id, user_id, cart_id, payment, delivery, comments, total, status)
	VALUES 
    (DEFAULT, '08c69f2f-72a1-4fc0-a02d-075b2f6b1693', '585e5c07-41d1-49ac-bcb9-c05e72753f30', '{"method": "cash", "amount": 123}', '{"type": "some type", "address": "12 some street"}', '', 123, 'ORDERED'),
    (DEFAULT, '8a3765d5-857b-43be-8526-18c23f2927a7', 'fc59b626-e9e5-4af4-8c67-bc9d179e0b5a', '{"method": "card", "amount": 321}', '{"type": "some type", "address": "11 some street"}', '', 321, 'ORDERED');
