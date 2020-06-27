<?php
$servername = "localhost";
$username = "root";
$password = "1234";
// Create connection
$conn = new mysqli($servername, $username, $password);
// Check connection
if ($conn->connect_error)
    die("Connection failed: " . $conn->connect_error);

$sql = "CREATE DATABASE PETEK";
if ($conn->query($sql) === TRUE)
    echo "Database created successfully";
// } else {
//     echo "Error creating database: " . $conn->error;
// }

$conn = new mysqli($servername, $username, $password, 'PETEK');



$sql = "CREATE TABLE users (
        email VARCHAR(30) NOT NULL PRIMARY KEY, nickName VARCHAR(30),
        Phone VARCHAR(50), password VARCHAR(30)NOT NULL
        )";
if ($conn->query($sql) === TRUE) {
    echo "Table users created successfully";
}
//  else {
//     echo "Error creating table users: " . $conn->error;
// }

$sql = "CREATE TABLE lists (
    listId INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    listName VARCHAR(30) NOT NULL,
    email VARCHAR(30)NOT NULL,FOREIGN KEY (email) REFERENCES users(email)

    )";
if ($conn->query($sql) === TRUE) {
    echo "Table lists created successfully";
}
// else {
// echo "Error creating table lists: " . $conn->error;
// }
$sql = "CREATE TABLE PRODUCTLIST (
    id INT(6) NOT NULL AUTO_INCREMENT PRIMARY KEY,
    Productname VARCHAR(30) NOT NULL, amount INT(30) NOT NULL,
    statusProduct VARCHAR(20)NOT NULL ,
    listId INT(6) NOT NULL,FOREIGN KEY (listid) REFERENCES lists(listId)
    )";
if ($conn->query($sql) === TRUE) {
    echo "Table PRODUCTLIST created successfully";
}
//  else {
//     echo "Error creating table PRODUCTLIST:" . $conn->error;
// }