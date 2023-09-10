BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "cafes" (
	"cafe_id"	VARCHAR,
	"cafe_name"	VARCHAR,
	"description"	VARCHAR,
	"location"	VARCHAR,
	"logo"	VARCHAR
);
CREATE TABLE IF NOT EXISTS "employees" (
	"employee_id"	VARCHAR,
	"name"	VARCHAR,
	"gender"	VARCHAR,
	"email"	VARCHAR,
	"phone"	VARCHAR,
	"join_date"	DATE,
	"cafe_id"	VARCHAR
);
INSERT INTO "cafes" ("cafe_id","cafe_name","description","location","logo") VALUES ('cbc738e4-1b41-45ae-9685-dac72c1e69f6','Cafe JE','Best coffee at West!','Jurong East','4.jpg'),
 ('0829a4f1-02cc-40bc-89cc-0b46995ae46e','Cafe Eunos','Best coffee at East!','Eunos','3.jpg'),
 ('0213d17a-a84d-4384-917e-316f62ab0a21','CafeChangi','Best coffee near the Changi airport!','Changi','changi.jpg'),
 ('fcb55957-74c0-4910-9b7a-cb776d8343e9','CafeEunos2','Yet another good coffee near Eunos!','Eunos','cafe-eunos-2.jpg');
INSERT INTO "employees" ("employee_id","name","gender","email","phone","join_date","cafe_id") VALUES ('UI6828835','Jacob12138','Male','xiey0017@gmail.com','90870139','2022-11-10','0829a4f1-02cc-40bc-89cc-0b46995ae46e'),
 ('UI9875102','Alexa1111','Female','Alexa@email.com','90980139','2023-01-24','cbc738e4-1b41-45ae-9685-dac72c1e69f6'),
 ('UI1866207','Cindyhi','Female','Cindy520@email.com','97846754','2022-08-31','0829a4f1-02cc-40bc-89cc-0b46995ae46e'),
 ('UI8897681','yanlin','Female','yanlin@gmail.com','98740492','2022-05-12','cbc738e4-1b41-45ae-9685-dac72c1e69f6'),
 ('UI5070593','XIE YUAN','Male','xixxx454@gmail.com','99988867','2023-09-02','0213d17a-a84d-4384-917e-316f62ab0a21'),
 ('UI6160602','Nobody','Male','nobody@gmail.com','99988898','2023-09-06',''),
 ('UI3915603','Sally1','Female','sally-34324@email.com','94736779','2023-08-23','fcb55957-74c0-4910-9b7a-cb776d8343e9');
COMMIT;
