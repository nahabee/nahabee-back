DROP DATABASE nahabee;

CREATE DATABASE nahabee;

USE nahabee;

DROP TABLE IF EXISTS brands;

DROP TABLE IF EXISTS images;

DROP TABLE IF EXISTS pages;

CREATE TABLE
    IF NOT EXISTS brands(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NULL
    );

CREATE TABLE
    IF NOT EXISTS images(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        idPage INT NOT NULL,
        CONSTRAINT fk_page_images FOREIGN KEY (idPage) REFERENCES pages(id),
    );

CREATE TABLE
    IF NOT EXISTS pages(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL
       );

INSERT INTO
    brands (
        name,
    )
VALUES
(
        'Maison Canopia',
    )
    (
        'Billabong',
    )
    (
        'Nyx',
    )
    (
        'Mellow Yellow',
    )
    (
        'Méduse',
    );

INSERT INTO
    images (
        name,
       idPage,
    )
VALUES
(
'https://firebasestorage.googleapis.com/v0/b/nahabee-8e73f.appspot.com/o/MaisonCanopia1.jpg?alt=media&token=07fa36ba-79d5-4d23-9959-ec14d5a484d8'        
   '1'
    ),
    (
     "https://firebasestorage.googleapis.com/v0/b/nahabee-8e73f.appspot.com/o/MaisonCanopia25.jpg?alt=media&token=53522563-d4a8-4a84-a796-54a3efd57631",
        '1'
    ),
     (
    "https://firebasestorage.googleapis.com/v0/b/nahabee-8e73f.appspot.com/o/MaisonCanopia68.jpg?alt=media&token=eb22d2e4-c512-4c24-aff6-4ea7c3c9af11",
        '1'
    ),
    (
        "https://firebasestorage.googleapis.com/v0/b/nahabee-8e73f.appspot.com/o/MaisonCanopia7.jpg?alt=media&token=16db5835-066f-48a7-af3e-d8554f159732",
'1'
    );
    INSERT INTO
    pages (
        title,
        )
VALUES (
    'Campaigns'
);
