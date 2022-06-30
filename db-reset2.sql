DROP DATABASE upside;

CREATE DATABASE upside;

USE upside;

DROP TABLE IF EXISTS projects;

DROP TABLE IF EXISTS users;

DROP TABLE IF EXISTS usersProjects;

CREATE TABLE
    IF NOT EXISTS users(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        firstname VARCHAR(100) NOT NULL,
        lastname VARCHAR(100) NOT NULL,
        password VARCHAR(100),
        email VARCHAR(255) NOT NULL,
        isIntern BOOLEAN NOT NULL,
        avatar TEXT NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS projects(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        nameProject VARCHAR(255) NOT NULL,
        image TEXT NOT NULL,
        projectDesc TEXT,
        client VARCHAR(100) NOT NULL,
        subsidiary VARCHAR(255) NOT NULL,
        startDate DATE,
        finalDate DATE,
        progress INT NOT NULL,
        industryTag VARCHAR(100) NOT NULL,
        color VARCHAR(100) NOT NULL,
        projectManager VARCHAR(100) NOT NULL
    );

CREATE TABLE
    IF NOT EXISTS usersProjects(
        id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
        idUser INT NOT NULL,
        idProject INT NOT NULL,
        CONSTRAINT fk_usersProjects_users FOREIGN KEY (idUser) REFERENCES users(id),
        CONSTRAINT fk_usersProjects_projects FOREIGN KEY (idProject) REFERENCES projects(id)
    );

INSERT INTO
    users (
        firstname,
        lastname,
        email,
        password,
        isIntern,
        avatar
    )
VALUES
(
        'Lydie',
        'Pluvinage',
        'lydie.pluvinage@wildcodeschool.com',
        "testmdp",
        true,
        avatar
    );

INSERT INTO
    projects (
        nameProject,
        image,
        projectDesc,
        client,
        subsidiary,
        startDate,
        finalDate,
        progress,
        industryTag,
        color,
        projectManager
    )
VALUES
(
        'StarTour',
        'Bayonne',
        'Sur la place',
        'Carrefour',
        'Lyon',
        '2022-06-02',
        '2022-10-01',
        0.7,
        'retail',
        'blue',
        'Jacques Dutronc'
    );