INSERT INTO users(user_id, username, email, password, phone) VALUES (DEFAULT, 'Adrian', 'admin@example.com', '$2a$10$AdbhnIPzgpFOHV9Jy4Jo1uQgeqzPFf2cDRnrgP5kDpciEFHSC9.pe', '123456789');
INSERT INTO users(user_id, username, email, password, phone) VALUES (DEFAULT, 'Jan', 'jan@example.com', '$2a$10$AdbhnIPzgpFOHV9Jy4Jo1uQgeqzPFf2cDRnrgP5kDpciEFHSC9.pe', '123456789');

INSERT INTO roles(role_id, name) VALUES (DEFAULT, 'ROLE_USER');
INSERT INTO roles(role_id, name) VALUES (DEFAULT, 'ROLE_MODERATOR');
INSERT INTO roles(role_id, name) VALUES (DEFAULT, 'ROLE_ADMIN');

INSERT INTO users_roles(user_id, role_id) VALUES (1,1);
INSERT INTO users_roles(user_id, role_id) VALUES (2,1);
INSERT INTO users_roles(user_id, role_id) VALUES (1,3);

INSERT INTO products(id, title, price, username, description, size, featured, free_shipping) VALUES (DEFAULT, 'Sukienka plus size 42-50', 85, 'Adrian', 'Przepiękna sukienka zakupiona w tym miesiącu w sklepie butik na plus. Niestety okazała się zbyt obszerna, a paragon gdzieś zaginął. Zakupiona za ok. 160 zł. Z aktualnej kolekcji, z tego względu też cena sukienki nie podlega negocjacji. Piękna, letnia, w delikatny wzór kwiatów. Można nosić ją z paskiem lub bez.Biust 118-130 Biodra 128-130 Długość 130 Biceps 38', 'XL', true, true);
INSERT INTO products(id, title, price, username, description, size, featured, free_shipping) VALUES (DEFAULT, 'Sukienka Tatuum S 36 piękne kolory', 36, 'Adrian', 'Sprzedam piekna sukienke, jest przewiewna z naturalnego materialu o pieknych kolorach. Dlugosc za kolana przy 170 cm wzrostu, fajny dekolt. Stan oceniam na b. dobry.', 'S', false, true);
INSERT INTO products(id, title, price, username, description, size, featured, free_shipping) VALUES (DEFAULT, 'Sweter męski 100% wełny merynosa xxl', 30, 'Jan', 'Mam do sprzedania sweter z 100% welny merynosa. Rozmiar xxl. Wysylka: 10 zl', 'XXL', true, false);
INSERT INTO products(id, title, price, username, description, size, featured, free_shipping) VALUES (DEFAULT, 'Kurtka termiczna damska stormberg L softshell przeciwdeszczowa 4f', 65, 'Adrian', 'Kurtka damska rozmiar L.Firmy Stromberg. Oddychajaca ,wodoszczelna,Wiatroszczelna, Caloroczna . Możliwa wysyłka 15 zł lub odbior osobisty"', 'L', false , false);
INSERT INTO products(id, title, price, username, description, size, featured, free_shipping) VALUES (DEFAULT, 'Ciemnorozowa bluzka new look 44 luzna z przodu zakladana', 20, 'Jan', 'Bluzke ciezko zmierzyc ,bo na plasko kiepsko sie uklada. Jest na tyle elastyczna ze bedzie rowniez dobra na xxxl.', 'XXL', false , false);
INSERT INTO products(id, title, price, username, description, size, featured, free_shipping) VALUES (DEFAULT, 'Jeansowa katana cubus dziewczeca 158/164 kozuszek', 40, 'Jan', 'Dlugosc 53,pachy45,biust45,pas44 od pachy33 ,dl.rekawa 60/43 ,sz.rekawa 10 . 100% bawelna material jeansowy, kozuszek100% poliester. Rozmiar dzieciecy jednak nosila osoba w rozmiarze xxs/xs byla idealna. Prosze sugerowac sie wymiarami.', 'XS', true , false);
