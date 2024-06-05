create type statusBarang as enum (
    'Available',
    'Sold',
    'Not Available',
    'On Bid',
    'Deleted'
);

create type roleUsers as enum (
    'Admin',
    'User'
);

create type statusTransaksi as enum (
    'Pending',
    'Success',
    'Failed'
);

create type kategoriBarang as enum (
    'Elektronik', 'Fashion', 'Otomotif', 'Perhiasaan dan Aksesoris', 
    'Mainan dan Hobi', 'Alat Musik', 'Barang Antik', 'Seni',
    'Budak', 'Barang lainnya'
);

create type paymentOption as enum (
    'Saldo', 'Bank Transfer', 'e-Wallet', 'Debit/Credit Card', 'Crypto'
);

create type accountStatus as enum (
    'Active', 'Suspended', 'Deleted'
);

create table if not exists Users (
    user_id uuid primary key default gen_random_uuid(),
    username varchar(255) not null unique,
    password varchar(255) not null,
    email varchar(255) not null unique,
    fullname varchar(255) not null,
    date_of_birth date not null,
    phone_number varchar(15) not null,
    role roleUsers not null default 'User',
    created_at timestamp default now(),
    saldo int not null default 0,
    bid_violation int not null default 0,
    profile_picture text,
    account_status accountStatus not null default 'Active',
    constraint check_role check (bid_violation <= 2 or account_status = 'Suspended')
);


create table if not exists Toko (
    toko_id uuid primary key default gen_random_uuid(),
    owner_id uuid references Users(user_id) on delete cascade,
    nama_toko varchar(255) not null,
    deskripsi text not null,
    created_at timestamp default now(),
    toko_picture text,
    toko_status accountStatus not null default 'Active',
    barang_sold_success int not null default 0,
    barang_sold_failed int not null default 0
);

create table if not exists Barang (
    barang_id uuid primary key default gen_random_uuid(),
    nama_barang varchar(255) not null,
    last_price int not null default 0,
    harga_awal int not null,
    status statusBarang not null,
    start_time timestamp not null,
    end_time timestamp not null,
    kategori kategoriBarang not null,
    deskripsi text not null,
    toko_id uuid references Toko(toko_id) on delete cascade,
    created_at timestamp default now(),
    bid_multiplier int not null,
    winner_id uuid references Users(user_id) on delete set null,
    barang_picture text
);

create table if not exists historyBid (
    history_id uuid primary key default gen_random_uuid(),
    barang_id uuid references Barang(barang_id) on delete cascade,
    user_id uuid references Users(user_id) on delete cascade,
    bid_price int not null,
    bid_at timestamp default now(),
    is_winner boolean not null default false,
    constraint check_bid_price check (bid_price > 0)
);

create table if not exists barangToko (
    barang_toko_id uuid primary key default gen_random_uuid(),
    barang_id uuid references Barang(barang_id) on delete cascade,
    toko_id uuid references Toko(toko_id) on delete cascade
);

create table if not exists Addresses (
    address_id uuid primary key default gen_random_uuid(),
    user_id uuid references Users(user_id) on delete cascade,
    address text not null,
    postal_code varchar(10) not null,
    city varchar(255) not null,
    province varchar(255) not null,
    created_at timestamp default now()
);

create table if not exists Transaksi (
    transaksi_id uuid primary key default gen_random_uuid(),
    barang_id uuid references Barang(barang_id) on delete cascade,
    user_id uuid references Users(user_id) on delete cascade,
    toko_id uuid references Toko(toko_id) on delete cascade,
    status statusTransaksi not null default 'Pending',
    created_at timestamp default now(),
    price int not null,
    payment_option paymentOption not null,
    payment_at timestamp,
    address_id uuid references Addresses(address_id) on delete set null
);

drop type if exists statusBarang, roleUsers, statusTransaksi, kategoriBarang, paymentOption, accountStatus cascade;
drop table if exists Users, Toko, Barang, historyBid, barangToko, Transaksi, Addresses cascade;