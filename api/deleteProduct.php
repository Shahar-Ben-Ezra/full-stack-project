<?php
require_once('../main/db.php');
header('Content-Type: application/json');
$id = $_POST['id'];

$sql = "DELETE FROM `productlist` WHERE id=$id";

if ($conn->query($sql) === TRUE) {
    echo json_encode("success");
} else {
    echo json_encode($conn->error);
}
$conn->close();
