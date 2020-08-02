INSERT INTO users(user_id, username, email, password, phone) VALUES (1, 'Adrian', 'admin@example.com', '$2y$12$29I3hHm6hAV0GrPYU8NHxOwAmNFjOvLb7V2bNCLQCq3eZHRFlp4Ge', '123456789');
INSERT INTO users(user_id, username, email, password, phone) VALUES (2, 'Jan', 'jan@example.com', '$2y$12$29I3hHm6hAV0GrPYU8NHxOwAmNFjOvLb7V2bNCLQCq3eZHRFlp4Ge', '123456789');

INSERT INTO roles(role_id, name) VALUES (1, 'ROLE_USER');
INSERT INTO roles(role_id, name) VALUES (2, 'ROLE_MODERATOR');
INSERT INTO roles(role_id, name) VALUES (3, 'ROLE_ADMIN');

INSERT INTO users_roles(user_id, role_id) VALUES (1,1);
INSERT INTO users_roles(user_id, role_id) VALUES (2,1);
INSERT INTO users_roles(user_id, role_id) VALUES (1,3);

INSERT INTO products(id, title, price, user_id, description, size, featured, freeShipping) VALUES (1, 'Sukienka plus size 42-50', 85, 2, 'Przepiękna sukienka zakupiona w tym miesiącu w sklepie butik na plus. Niestety okazała się zbyt obszerna, a paragon gdzieś zaginął. Zakupiona za ok. 160 zł. Z aktualnej kolekcji, z tego względu też cena sukienki nie podlega negocjacji. Piękna, letnia, w delikatny wzór kwiatów. Można nosić ją z paskiem lub bez.Biust 118-130 Biodra 128-130 Długość 130 Biceps 38', 'XL', true, true);
INSERT INTO products(id, title, price, user_id, description, size, featured, freeShipping) VALUES (2, 'Sukienka Tatuum S 36 piękne kolory', 36, 2, 'Sprzedam piekna sukienke, jest przewiewna z naturalnego materialu o pieknych kolorach. Dlugosc za kolana przy 170 cm wzrostu, fajny dekolt. Stan oceniam na b. dobry.', 'S', true, true);
INSERT INTO products(id, title, price, user_id, description, size, featured, freeShipping) VALUES (3, 'Sweter męski 100% wełny merynosa xxl', 30, 2, 'Mam do sprzedania sweter z 100% welny merynosa. Rozmiar xxl. Wysylka: 10 zl', 'XXL', true, false);
INSERT INTO products(id, title, price, user_id, description, size, featured, freeShipping) VALUES (4, 'Kurtka termiczna damska stormberg L softshell przeciwdeszczowa 4f', 65, 2, 'Kurtka damska rozmiar L.Firmy Stromberg. Oddychajaca ,wodoszczelna,Wiatroszczelna, Caloroczna . Możliwa wysyłka 15 zł lub odbior osobisty"', 'L', false , false);
INSERT INTO products(id, title, price, user_id, description, size, featured, freeShipping) VALUES (5, 'Ciemnorozowa bluzka new look 44 luzna z przodu zakladana', 20, 2, 'Bluzke ciezko zmierzyc ,bo na plasko kiepsko sie uklada. Jest na tyle elastyczna ze bedzie rowniez dobra na xxxl.', 'XXL', false , false);
INSERT INTO products(id, title, price, user_id, description, size, featured, freeShipping) VALUES (6, 'Jeansowa katana cubus dziewczeca 158/164 kozuszek', 40, 2, 'Dlugosc 53,pachy45,biust45,pas44 od pachy33 ,dl.rekawa 60/43 ,sz.rekawa 10 . 100% bawelna material jeansowy, kozuszek100% poliester. Rozmiar dzieciecy jednak nosila osoba w rozmiarze xxs/xs byla idealna. Prosze sugerowac sie wymiarami.', 'XS', false , false);
