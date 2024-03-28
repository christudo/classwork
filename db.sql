drop database if exists my_first_db;

create database my_first_db;

\c my_first_db

CREATE TABLE "users" (
  "id" serial,
  "name" varchar,
  "email" varchar,
  "password" varchar,
  "salt" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "genres" (
  "id" serial ,
  "name" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "books" (
  "id" serial,
  "title" varchar,
  "genre_id" Int,
  "publishing_year" Int,
  PRIMARY KEY ("id")
);

CREATE TABLE "comments" (
  "id" serial,
  "user_id" Int,
  "book_id" Int,
  "comment" varchar,
  "created_at" timestamp,
  PRIMARY KEY ("id")
);

CREATE TABLE "authors" (
  "id" serial,
  "first_name" varchar,
  "last_name" varchar,
  PRIMARY KEY ("id")
);

CREATE TABLE "authors_books" (
  "id" serial,
  "author_id" Int,
  "book_id" Int,
  PRIMARY KEY ("id")
);

CREATE TABLE "books_users" (
  "id" serial,
  "user_id" Int,
  "book_id" Int,
  "read_status" varchar,
  PRIMARY KEY ("id")
);

CREATE INDEX "CCK" ON  "books_users" ("user_id", "book_id");

