<?php
require_once('../main/db.php');
header('Content-Type: application/json');

$Productname = $_POST['productname'];
$amount = $_POST['amount'];
$email = $_POST['email'];
$SelectedListId = $_POST['SelectedListId'];


$sql = "INSERT INTO `productlist`(`Productname`,`amount`,`statusProduct`,`email`,`listId`)
    VALUES ('$Productname','$amount','Need to buy','$email','$SelectedListId')";
if ($conn->query($sql) === TRUE) {
    $finalResult = json_encode($conn->insert_id);
    $sql = "SELECT * FROM boughtproducts WHERE email = '$email' && Productname = '$Productname'";
    $result = $conn->query($sql);
    if (!empty($result) && $result->num_rows > 0) {
        echo $finalResult;
    } else {
        $sql = "INSERT INTO `boughtproducts`(`email`,`Productname`)
    VALUES ('$email','$Productname')";
        $conn->query($sql);
        echo $finalResult;
    }
} else {
    echo "didnt created ";
}
$conn->close();
