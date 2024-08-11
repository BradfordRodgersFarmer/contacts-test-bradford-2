Drop table if exists "contacts";
Drop table if exists "audit_log";
Create table if not exists "contacts" (
    id INTEGER primary key autoincrement,
    first_name varchar(255) not null,
    last_name varchar(255) not null,
    phone varchar(255) not null,
    email varchar(255) not null,
    active boolean not null default 1
);

Create table if not exists "audit_log" (
    id INTEGER primary key autoincrement,
    contact_id int not null,
    action varchar(255) not null,
    old_value varchar(255) not null,
    new_value varchar(255) not null,
    created_at datetime not null,
    foreign key (contact_id) references contacts(id)
);



insert into contacts (first_name, last_name, phone, email) values ('John', 'Doe', '123-456-7890', 'john@john.com');
insert into contacts (first_name, last_name, phone, email) values ('Jane', 'Doe', '123-456-7890', 'jane@jane.com');
insert into contacts (first_name, last_name, phone, email) values ('Jim', 'Doe', '123-456-7890', 'jim@jim.com');
insert into audit_log (contact_id, action, old_value, new_value, created_at) values (1, 'update', 'John', 'Johnny', '2021-01-01 00:00:00');